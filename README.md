# Week 5 Task
## Understanding
Add new feature that enable user to click on the one of patients rows from the patients table to redirect user to page `history` via define new route `history/id`.
This new page display the following sections:
- Section 1(Patient info): (FULL NAME capitalized as in XD, phone, age, and gender)
- Section 2(New Button): A button enable the user to open a Modal or dialog for adding new history record for this patient.
- Section 3(Patient Table): list history records of this patient which are loaded at loading the page.
- Section 4(Add New History Modal): be default this will be hidden, and once the user click on new button, this modal shown.



Let's take a scenario:
- User now at patients page and clicked on a patient row.
- User redirect to page `history/id`, id here is patient id to pass to the history page.
- Fetch patient profile information and history by doing a get request to get user by passed ID (/patients/id - GET)
- Fill profile information and history table.
- Once the user click on `new` button, a Modal/Dialog displayed for the user to fill new history data to submit.
- when the user click on `save` button in Dialog/Modal, a validation on the inputs should be implemented, then submit the data to the endpoint `patients/id/history  - POST`
- The modal must close once the record added and the fields of the modal should be cleared.
- New Record must be added directly in real-time to the table.
- Use can delete a history by click on delete button of the history row.
## Prerequisites
- Clone and run latest changes of clinc-api repo (https://github.com/computiq-training/clinic-api.git)
- Postman to test Rest API, you can find API collection.json from here ().

## Requirements
- Implement on patient row click: to redirect user to route/page `patients/id`, passing id of clicked patient.
- Implemnent History Page: 
  - load the patient profile and history at startup of the page via useEffect, use endpoint `patients/id - GET`
  - Fill profile information
  - Fill history table with history list.
  - Implement histpry delete.
  - Implement `add new history` feature (button and modal).
- Try as much as possible to match look and feel of yours with below XD design.
## Endpoints
- `patients/id` GET: to get specific patient with history list
- `patients/id/history` POST: to add new history for the patient.
- `patients/history/id` DELETE: to delete a history record 
## UI/UX
![New History](https://user-images.githubusercontent.com/20383171/203422472-06e0a181-f70c-4950-bf5a-ef5f23372433.png)
![History Profile](https://user-images.githubusercontent.com/20383171/203422477-6540b000-831a-49d9-a7c6-36d8e515a1e7.png)
