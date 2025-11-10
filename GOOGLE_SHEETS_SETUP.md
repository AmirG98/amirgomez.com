# Google Sheets Integration Setup Guide

## Step 1: Prepare Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1R_a0qRm5majkxMqSie0E24H-qELRH3R_x0jQQokvoNU/edit

2. **Add headers to Row 1** (copy and paste these into columns A-Q):
   ```
   Timestamp	Form Type	Email	First Name	Last Name	Company	Phone	Website	Monthly Budget	Biggest Challenge	Main Goal	Budget Range	Services Interested	Timeline	Industry	Role	Status
   ```

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**

2. **Delete the default code** and replace with this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add timestamp
    const timestamp = new Date().toLocaleString();
    
    // Create row data matching your headers
    const rowData = [
      timestamp,                          // A: Timestamp
      data.formType || '',               // B: Form Type
      data.email || '',                  // C: Email
      data.firstName || '',              // D: First Name
      data.lastName || '',               // E: Last Name
      data.company || '',                // F: Company
      data.phone || '',                  // G: Phone
      data.website || '',                // H: Website
      data.monthlyBudget || '',          // I: Monthly Budget
      data.biggestChallenge || '',       // J: Biggest Challenge
      data.mainGoal || '',               // K: Main Goal
      data.budgetRange || '',            // L: Budget Range
      data.servicesInterested || '',     // M: Services Interested
      data.timeline || '',               // N: Timeline
      data.industry || '',               // O: Industry
      data.role || '',                   // P: Role
      data.status || 'completed'         // Q: Status
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Save the script** (Ctrl+S or File > Save)

## Step 3: Deploy as Web App

1. Click **"Deploy"** button (top right)
2. Click **"New Deployment"**
3. Click the gear icon next to "Type" and select **"Web app"**
4. Configure:
   - **Description**: "Website Form Submissions"
   - **Execute as**: "Me (your email)"
   - **Who has access**: "Anyone"
5. Click **"Deploy"**
6. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## Step 4: Configure Your Website

1. Open the file `.env.local` in your project
2. Replace `YOUR_APPS_SCRIPT_URL_HERE` with your actual Web App URL:
   ```
   NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## Step 5: Deploy Changes

Run these commands to deploy:
```bash
git add .
git commit -m "Add Google Sheets integration for form submissions"
git push origin main
```

## Testing

1. Visit your website
2. Fill out any form (consultation, audit, campaign, case studies)
3. Check your Google Sheet - new submissions should appear as new rows

## Form Types and Data

Each form type sends different data:

### Consultation Form
- formType: "consultation"
- Fields: email, firstName, lastName, company, phone, monthlyBudget, biggestChallenge

### Audit Form  
- formType: "audit"
- Fields: email, firstName, lastName, company, website, monthlyBudget, mainGoal

### Campaign Form
- formType: "campaign" 
- Fields: email, firstName, lastName, company, phone, budgetRange, servicesInterested, timeline

### Case Studies Form
- formType: "caseStudies"
- Fields: email, firstName, lastName, company, industry, role

### Newsletter Form
- formType: "newsletter"
- Fields: email, firstName, lastName

## Troubleshooting

- **No data appearing**: Check that the Apps Script URL is correct in `.env.local`
- **Permission errors**: Make sure the script is deployed with "Anyone" access
- **Script errors**: Check the Apps Script logs (View > Logs in Apps Script editor)