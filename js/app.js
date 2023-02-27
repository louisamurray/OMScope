import React, { useState } from 'react';

const areasOfResponsibility = {
  Objectives: ['objectives'],
  'Key Deliverables': ['deliverables'],
  KPI's: [
    'KPI',
    'key performance indicator',
    'performance metrics',
    'performance indicators',
    'performance measures',
  ],
  'Office Operations': [
    'front desk',
    'receptionist',
    'office procedure',
    'supplies',
    'equipment',
    'policies',
    'administrative tasks',
    'office administration',
    'office procedures',
  ],
  'Daily Management of Chamber Office': [
    'office management',
    'office administration',
    'office oversight',
    'office supervision',
  ],
  'Export Certification': [
    'certificate',
    'export documents',
    'export',
    'import',
    'COO',
    'COF',
    'CFS',
    'certificate',
    'Certificate of Origin',
    'cert',
    'export authorization',
    'export permit',
  ],
  'Accounts and Finance': [
    'pay',
    'payment',
    'Xero',
    'accounts',
    'receivable',
    'payable',
    'invoice',
    'GST',
    'creditors',
    'bills',
    'financial management',
    'financial administration',
    'bookkeeping',
    'accounting',
  ],
  'Marketing & Graphic Design': [
    'branding',
    'social media',
    'competitors',
    'marketing campaigns',
    'promotional material',
    'advertising',
    'publicity',
    'graphic design',
    'brand management',
  ],
  'Computers & IT': [
    'IT processes',
    'hardware',
    'system',
    'IT',
    'tech',
    'CRM',
    'software',
    'troubleshooting',
    'website',
    'print',
    'printer',
    'information technology',
    'computer systems',
    'computer hardware',
    'software systems',
  ],
  Membership: [
    'induction',
    'member interactions',
    'member',
    'membership renewal',
    'member engagement',
    'member retention',
    'member services',
  ],
  'Chamber Events': [
    'event logistics',
    'technical equipment',
    'representing the Chamber',
    'event planning',
    'event coordination',
    'event management',
  ],
  'Health & Safety Officer': [
    'Health & Safety',
    'compliance',
    'risk',
    'occupational health and safety',
    'workplace safety',
  ],
  'Facilities Management': [
    'building maintenance',
    'janitorial services',
    'property management',
    'groundskeeping',
    'facility maintenance',
    'property maintenance',
  ],
  Human Resources: [
    'recruiting',
    'onboarding',
      'employee relations',
'payroll',
'benefits administration',
'performance management',
'personnel management',
'staff management',
],
'Project Management': [
'planning',
'budgeting',
'scheduling',
'coordination',
'stakeholder management',
'project planning',
'project coordination',
'project oversight',
],
Procurement: [
'sourcing',
'order',
'vendor management',
'contract negotiation',
'inventory management',
'procurement management',
'purchasing',
'supply chain management',
],
};

function checkScope(task) {
task = task.toLowerCase();

let taskMatches = false;
let matchedArea = null;

Object.entries(areasOfResponsibility).forEach(([area, keywords]) => {
if (taskMatches) return;
    
keywords.forEach((keyword) => {
  if (task.includes(keyword.toLowerCase())) {
    taskMatches = true;
    matchedArea = area;
  }
});

    
    });

return [taskMatches, matchedArea];
}

function App() {
const [taskInput, setTaskInput] = useState('');
const [result, setResult] = useState('');
const [matchedArea, setMatchedArea] = useState(null);
const [showForm, setShowForm] = useState(false);

const [requester, setRequester] = useState('');
const [priority, setPriority] = useState('Low');
const [dueDate, setDueDate] = useState('');
const [instructions, setInstructions] = useState('');

const handleTaskInputChange = (event) => {
setTaskInput(event.target.value);
};

const handleSubmit = (event) => {
event.preventDefault();
const [taskMatches, area] = checkScope(taskInput);
    
    if (taskMatches) {
  setResult('The requested task may fall within the scope of the Office Manager role.');
  setMatchedArea(area);
  setShowForm(true);
} else {
  setResult('The requested task may not fall within the scope of the Office Manager role. Please contact the CEO for clarification');
  setShowForm(false);
}
};

const handleRequesterChange = (event) => {
setRequester(event.target.value);
};

const handlePriorityChange = (event) => {
setPriority(event.target.value);
};

const handleDueDateChange = (event) => {
setDueDate(event.target.value);
};

const handleInstructionsChange = (event) => {
setInstructions(event.target.value);
};

const handleFormSubmit = (event) => {
event.preventDefault();
    
    const emailBody = `Requester: ${requester}
Priority: ${priority}
Due Date: ${dueDate}
Instructions: ${instructions}
Task Description: ${taskInput}

The task '${taskInput}' is associated with the following area of responsibility: ${matchedArea}`;
    window.location.href = `mailto:info@marlboroughchamber.nz?subject=New task request&body=${encodeURIComponent(
  emailBody
)}`;
};

return (
<div>
<form onSubmit={handleSubmit}>
<label htmlFor="taskInput">Task:</label>
<input
       type="text"
       id="taskInput"
       value={taskInput}
       onChange={handleTaskInputChange}
     />
<button type="submit">Check Scope</button>
</form>
<div id="result">{result}</div>
{showForm && (
<form onSubmit={handleFormSubmit}>
<label htmlFor="requester">Requester:</label>
<input
         type="text"
         id="requester"
         value={requester}
         onChange={handleRequesterChange}
       />
<br />
<label htmlFor="priority">Priority:</label>
<input
type="radio"
name="priority"
id="priorityLow"
value="Low"
checked={priority === 'Low'}
onChange={handlePriorityChange}
/>
<label htmlFor="priorityLow">Low</label>
<input
type="radio"
name="priority"
id="priorityMedium"
value="Medium"
checked={priority === 'Medium'}
onChange={handlePriorityChange}
/>
<label htmlFor="priorityMedium">Medium</label>
<input
type="radio"
name="priority"
id="priorityHigh"
value="High"
checked={priority === 'High'}
onChange={handlePriorityChange}
/>
<label htmlFor="priorityHigh">High</label>
<br />
<label htmlFor="dueDate">Due Date:</label>
<input
         type="date"
         id="dueDate"
         value={dueDate}
         onChange={handleDueDateChange}
       />
<br />
<label htmlFor="instructions">Instructions:</label>
<textarea
         id="instructions"
         value={instructions}
         onChange={handleInstructionsChange}
       />
<br />
<button type="submit">Submit</button>
</form>
)}
</div>
);
}

export default App;
