// Define the areas of responsibility and their associated keywords
var areasOfResponsibility = {
    "Objectives": ["objectives"],
    "Key Deliverables": ["deliverables"],
    "KPI's": ["KPI", "key performance indicator"],
    "Office Operations": ["front desk", "receptionist", "office procedure", "supplies", "equipment", "policies"],
    "Daily Management of Chamber Office": ["office management"],
    "Export Certification": ["certificate", "export documents", "export", "import", "COO", "COF", "CFS", "certificate", "Certificate of Origin", "cert"],
    "Accounts and Finance": ["pay","payment", "Xero", "accounts", "receivable", "payable", "invoice", "GST", "creditors", "bills"],
    "Marketing & Graphic Design": ["branding", "social media", "competitors", "marketing campaigns", "promotional material"],
    "Computers & IT": ["IT processes", "hardware", "system", "IT", "tech", "CRM", "software", "troubleshooting", "website"],
    "Membership": ["induction", "member interactions", "member", "membership renewal"],
    "Chamber Events": ["event logistics", "technical equipment", "representing the Chamber"],
    "Health & Safety Officer": ["Health & Safety", "compliance", "risk"],
    "Facilities Management": ["building maintenance", "janitorial services", "property management", "groundskeeping"],
    "Human Resources": ["recruiting", "onboarding", "employee relations", "payroll", "benefits administration", "performance management"],
    "Project Management": ["planning", "budgeting", "scheduling", "coordination", "stakeholder management"],
    "Procurement": ["sourcing", "vendor management", "contract negotiation", "inventory management"]
  };
  
  function checkScope() {
    // Get the input value
    var task = document.getElementById("taskInput").value;
  
    // Check if the task matches an area of responsibility
    var taskMatches = false;
    var matchedArea = null;
    for (var area in areasOfResponsibility) {
      var keywords = areasOfResponsibility[area];
      for (var i = 0; i < keywords.length; i++) {
        if (task.toLowerCase().includes(keywords[i].toLowerCase())) {
          taskMatches = true;
          matchedArea = area;
          break;
        }
      }
      if (taskMatches) {
        break;
      }
    }
  
  
    // Display the form for providing additional details
    if (taskMatches) {
      document.getElementById("result").innerHTML = "The requested task may fall within the scope of the Office Manager role (" + matchedArea + "). Please provide additional details:";
      document.getElementById("detailsForm").style.display = "block";
      document.getElementById("matchedArea").value = matchedArea;
    } else {
      document.getElementById("result").innerHTML = "The requested task may not fall within the scope of the Office Manager role. Please contact the CEO for clarification";
      document.getElementById("detailsForm").style.display = "none";
    }
  }

  function submitDetails() {
    // Get the form field values
    var requester = document.getElementById("requester").value;
    var priority = document.querySelector('input[name="priority"]:checked').value;
    var dueDate = document.getElementById("dueDate").value;
    var instructions = document.getElementById("instructions").value;
    var taskInput = document.getElementById("taskInput").value;
    var matchedArea = document.getElementById("matchedArea").value;
  
    // Format the email body
    var emailBody = "Requester: " + requester + "\n" +
                    "Priority: " + priority + "\n" +
                    "Due Date: " + dueDate + "\n" +
                    "Instructions: " + instructions + "\n" +
                    "Task Description: " + taskInput + "\n\n" +
                    "The task '" + taskInput + "' is associated with the following area of responsibility: " + matchedArea;
  
    // Open the user's default email client with the pre-populated email fields
    var emailLink = 'mailto:info@marlboroughchamber.nz?subject=New task request&body=' + encodeURIComponent(emailBody);
    window.location.href = emailLink;
  
    // Reset the form and hide it
    document.getElementById("detailsForm").reset();
    document.getElementById("detailsForm").style.display = "none";
  }
  