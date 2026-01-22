'use client';

import { useState, useEffect, useCallback } from 'react';

interface QuizEvent {
  timestamp: string;
  sessionId: string;
  event: string;
  questionNumber?: number;
  answer?: string;
  readinessLevel?: string;
  name?: string;
  email?: string;
  company?: string;
  formType?: string;
}

interface FunnelStep {
  name: string;
  count: number;
  dropoff: number;
  dropoffRate: string;
}

export default function QuizAnalyticsPage() {
  const [events, setEvents] = useState<QuizEvent[]>([]);
  const [funnel, setFunnel] = useState<FunnelStep[]>([]);
  const [dateRange, setDateRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [sheetUrl, setSheetUrl] = useState('');
  const [error, setError] = useState('');

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError('');

    let allEvents: QuizEvent[] = [];

    // Try to fetch from Google Sheets if URL is provided
    if (sheetUrl) {
      try {
        const response = await fetch(sheetUrl);
        const data = await response.json();
        // Expect data to be an array of events from the sheet
        if (Array.isArray(data)) {
          allEvents = data.filter((row: QuizEvent) => row.formType === 'quiz_analytics' || row.event);
        }
      } catch (err) {
        console.error('Failed to fetch from Google Sheets:', err);
        setError('Failed to fetch data. Check your Sheet URL.');
      }
    }

    // If no sheet URL, show setup message
    if (allEvents.length === 0 && !sheetUrl) {
      setError('Enter your Google Sheets JSON URL to view analytics.');
    }

    // Filter by date range
    const now = new Date();
    const cutoff = new Date();
    switch (dateRange) {
      case '24h':
        cutoff.setHours(now.getHours() - 24);
        break;
      case '7d':
        cutoff.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoff.setDate(now.getDate() - 30);
        break;
      case 'all':
        cutoff.setFullYear(2020);
        break;
    }

    const filteredEvents = allEvents.filter(e => new Date(e.timestamp) >= cutoff);
    setEvents(filteredEvents);

    // Calculate funnel
    const sessions = new Set(filteredEvents.map(e => e.sessionId));
    const sessionData: Record<string, { maxQuestion: number; completed: boolean; submitted: boolean }> = {};

    sessions.forEach(sessionId => {
      const sessionEvents = filteredEvents.filter(e => e.sessionId === sessionId);
      const maxQ = Math.max(0, ...sessionEvents.filter(e => e.event === 'answer_question').map(e => e.questionNumber || 0));
      const completed = sessionEvents.some(e => e.event === 'complete_quiz');
      const submitted = sessionEvents.some(e => e.event === 'submit_lead');
      sessionData[sessionId] = { maxQuestion: maxQ, completed, submitted };
    });

    const totalSessions = sessions.size;
    const q1 = Object.values(sessionData).filter(s => s.maxQuestion >= 1).length;
    const q2 = Object.values(sessionData).filter(s => s.maxQuestion >= 2).length;
    const q3 = Object.values(sessionData).filter(s => s.maxQuestion >= 3).length;
    const q4 = Object.values(sessionData).filter(s => s.maxQuestion >= 4).length;
    const q5 = Object.values(sessionData).filter(s => s.maxQuestion >= 5).length;
    const completed = Object.values(sessionData).filter(s => s.completed).length;
    const submitted = Object.values(sessionData).filter(s => s.submitted).length;

    const funnelData: FunnelStep[] = [
      { name: 'Page View', count: totalSessions, dropoff: totalSessions - q1, dropoffRate: totalSessions > 0 ? `${(((totalSessions - q1) / totalSessions) * 100).toFixed(1)}%` : '0%' },
      { name: 'Q1: Goal', count: q1, dropoff: q1 - q2, dropoffRate: q1 > 0 ? `${(((q1 - q2) / q1) * 100).toFixed(1)}%` : '0%' },
      { name: 'Q2: Budget', count: q2, dropoff: q2 - q3, dropoffRate: q2 > 0 ? `${(((q2 - q3) / q2) * 100).toFixed(1)}%` : '0%' },
      { name: 'Q3: Spanish Setup', count: q3, dropoff: q3 - q4, dropoffRate: q3 > 0 ? `${(((q3 - q4) / q3) * 100).toFixed(1)}%` : '0%' },
      { name: 'Q4: Target GEO', count: q4, dropoff: q4 - q5, dropoffRate: q4 > 0 ? `${(((q4 - q5) / q4) * 100).toFixed(1)}%` : '0%' },
      { name: 'Q5: Timeline', count: q5, dropoff: q5 - completed, dropoffRate: q5 > 0 ? `${(((q5 - completed) / q5) * 100).toFixed(1)}%` : '0%' },
      { name: 'Lead Form', count: completed, dropoff: completed - submitted, dropoffRate: completed > 0 ? `${(((completed - submitted) / completed) * 100).toFixed(1)}%` : '0%' },
      { name: 'Submitted', count: submitted, dropoff: 0, dropoffRate: '0%' },
    ];

    setFunnel(funnelData);
    setIsLoading(false);
  }, [sheetUrl, dateRange]);

  useEffect(() => {
    // Load saved sheet URL from localStorage
    const savedUrl = localStorage.getItem('quiz_analytics_sheet_url');
    if (savedUrl) {
      setSheetUrl(savedUrl);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const handleSheetUrlChange = (url: string) => {
    setSheetUrl(url);
    localStorage.setItem('quiz_analytics_sheet_url', url);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `quiz-analytics-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const totalConversionRate = funnel[0]?.count > 0
    ? ((funnel[funnel.length - 1]?.count / funnel[0]?.count) * 100).toFixed(1)
    : '0';

  const recentLeads = events
    .filter(e => e.event === 'submit_lead')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quiz Analytics</h1>
            <p className="text-white/60">Hispanic Marketing Quiz Funnel Performance</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="all">All time</option>
            </select>
            <button
              onClick={loadAnalytics}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={exportData}
              className="bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-lg px-4 py-2 hover:bg-orange-500/30 transition-colors"
            >
              Export
            </button>
          </div>
        </div>

        {/* Google Sheets URL Input */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-3">Data Source</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={sheetUrl}
              onChange={(e) => handleSheetUrlChange(e.target.value)}
              placeholder="Paste your Google Sheets JSON URL here..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={loadAnalytics}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Load Data
            </button>
          </div>
          {error && <p className="text-yellow-400 text-sm mt-3">{error}</p>}
          <p className="text-white/40 text-sm mt-3">
            To get your JSON URL: Open your Google Sheet → Extensions → Apps Script → Deploy as Web App → Copy the URL
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-white/60">Loading analytics...</div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white mb-1">{funnel[0]?.count || 0}</div>
                <div className="text-sm text-white/50">Total Visitors</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-1">{funnel[funnel.length - 1]?.count || 0}</div>
                <div className="text-sm text-white/50">Leads Captured</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-orange-400 mb-1">{totalConversionRate}%</div>
                <div className="text-sm text-white/50">Conversion Rate</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {funnel[0]?.count > 0 ? ((funnel[6]?.count / funnel[0]?.count) * 100).toFixed(1) : '0'}%
                </div>
                <div className="text-sm text-white/50">Quiz Completion</div>
              </div>
            </div>

            {/* Funnel Visualization */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Funnel Analysis</h2>
              <div className="space-y-3">
                {funnel.map((step, i) => {
                  const maxCount = funnel[0]?.count || 1;
                  const widthPercent = maxCount > 0 ? (step.count / maxCount) * 100 : 0;
                  const isHighDropoff = parseFloat(step.dropoffRate) > 30;

                  return (
                    <div key={step.name} className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white/80">{step.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-white/60">{step.count} users</span>
                          {step.dropoff > 0 && (
                            <span className={`text-xs px-2 py-0.5 rounded ${isHighDropoff ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              -{step.dropoff} ({step.dropoffRate})
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                        <div
                          className={`h-full rounded-lg transition-all duration-500 ${
                            i === funnel.length - 1 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'
                          }`}
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drop-off Insights */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Biggest Drop-offs</h2>
                {funnel
                  .filter(s => s.dropoff > 0)
                  .sort((a, b) => parseFloat(b.dropoffRate) - parseFloat(a.dropoffRate))
                  .slice(0, 3)
                  .map((step, i) => (
                    <div key={step.name} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          i === 0 ? 'bg-red-500/20 text-red-400' : i === 1 ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {i + 1}
                        </span>
                        <span className="text-white/80">{step.name}</span>
                      </div>
                      <span className="text-red-400 font-medium">{step.dropoffRate} drop</span>
                    </div>
                  ))}
                {funnel.filter(s => s.dropoff > 0).length === 0 && (
                  <p className="text-white/50 text-center py-4">No drop-off data yet</p>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Recent Leads</h2>
                {recentLeads.length > 0 ? (
                  <div className="space-y-3">
                    {recentLeads.map((lead, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                        <div>
                          <div className="font-medium text-white/90">{lead.name || 'Unknown'}</div>
                          <div className="text-sm text-white/50">{lead.email}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded ${
                            lead.readinessLevel === 'ready-to-scale' ? 'bg-green-500/20 text-green-400' :
                            lead.readinessLevel === 'building-momentum' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {lead.readinessLevel?.replace(/-/g, ' ') || 'N/A'}
                          </div>
                          <div className="text-xs text-white/40 mt-1">
                            {new Date(lead.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50 text-center py-4">No leads captured yet</p>
                )}
              </div>
            </div>

            {/* Event Log */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Event Log (Last 50)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-white/50 border-b border-white/10">
                      <th className="pb-3 pr-4">Timestamp</th>
                      <th className="pb-3 pr-4">Session</th>
                      <th className="pb-3 pr-4">Event</th>
                      <th className="pb-3 pr-4">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .slice(0, 50)
                      .map((event, i) => (
                        <tr key={i} className="border-b border-white/5 text-white/70">
                          <td className="py-2 pr-4 whitespace-nowrap">
                            {new Date(event.timestamp).toLocaleString()}
                          </td>
                          <td className="py-2 pr-4 font-mono text-xs">
                            {event.sessionId?.slice(0, 8)}...
                          </td>
                          <td className="py-2 pr-4">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              event.event === 'submit_lead' ? 'bg-green-500/20 text-green-400' :
                              event.event === 'complete_quiz' ? 'bg-blue-500/20 text-blue-400' :
                              event.event === 'page_view' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-white/10 text-white/60'
                            }`}>
                              {event.event}
                            </span>
                          </td>
                          <td className="py-2 text-white/50">
                            {event.questionNumber && `Q${event.questionNumber}`}
                            {event.answer && `: ${event.answer.slice(0, 30)}${event.answer.length > 30 ? '...' : ''}`}
                            {event.readinessLevel && `Level: ${event.readinessLevel}`}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {events.length === 0 && (
                  <p className="text-white/50 text-center py-8">No events recorded yet. Configure your data source above.</p>
                )}
              </div>
            </div>

            {/* Setup Instructions */}
            <div className="mt-8 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-3">Setup Instructions</h3>
              <div className="text-white/60 text-sm space-y-2">
                <p><strong>1.</strong> Open your Google Sheet where quiz data is being collected</p>
                <p><strong>2.</strong> Go to Extensions → Apps Script</p>
                <p><strong>3.</strong> Add this function to return data as JSON:</p>
                <pre className="bg-black/30 p-3 rounded-lg mt-2 overflow-x-auto text-xs">
{`function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('QuizAnalytics');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return ContentService.createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}`}
                </pre>
                <p><strong>4.</strong> Deploy → New Deployment → Web App → Execute as: Me, Access: Anyone</p>
                <p><strong>5.</strong> Copy the deployment URL and paste it above</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
