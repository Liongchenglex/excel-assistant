# Excel Table Processor

## Project Overview

The Excel Table Processor is a sophisticated web application designed to streamline and automate complex Excel operations. This tool bridges the gap between raw Excel data and actionable insights by leveraging cutting-edge AI technology to generate Excel formulas and VBA scripts.

## Key Features

- **Dynamic Table Input**: Users can paste multiple Excel tables directly into the application, preserving their structure and formatting.
- **AI-Powered Formula Generation**: Utilizes OpenAI's GPT model to create complex Excel formulas based on sample data and expected outcomes.
- **Automated VBA Script Creation**: Generates VBA scripts to automate repetitive tasks and data transformations in Excel.
- **Interactive Follow-up System**: Allows users to ask follow-up questions and receive clarifications on the generated formulas or VBA scripts.
- **Responsive Design**: Fully responsive web interface that works seamlessly across desktop and mobile devices.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **AI Integration**: OpenAI GPT-4o-mini API
- **State Management**: React Hooks
- **Styling**: CSS3 with Flexbox

## Project Structure
Project Excel
│
├── backend
│   ├── server.js
│   └── package.json
│
└── excel_helper
├── public
├── src
│   ├── components
│   │   ├── SampleTableSection.js
│   │   ├── ExpectedOutcomeSection.js
│   │   ├── FormulaGenerator.js
│   │   ├── VBAStepGenerator.js
│   │   ├── PromptDisplay.js
│   │   └── FollowUpSection.js
│   ├── App.js
│   └── index.js
└── package.json

## Installation and Setup

1. Clone the repository:
git clone https://github.com/your-username/excel-table-processor.git

2. Install backend dependencies:
cd backend
npm install 
  
3. Install frontend dependencies:
cd ../excel_helper
npm install

4. Set up environment variables:
Create a `.env` file in the backend directory and add your OpenAI API key:
"OPENAI_API_KEY=your_api_key_here"

5. Start the backend server:
cd ../backend
npm start

6. Start the React development server:
cd ../excel_helper
npm start

7. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Paste your sample Excel table(s) into the provided input areas.
2. Input the expected outcome in the designated section.
3. Click on "Generate Formula" or "Create VBA Steps" based on your requirements.
4. Review the AI-generated response.
5. Use the follow-up section to ask for clarifications or modifications if needed.


## Acknowledgments

- OpenAI for providing the GPT-4 API
- The React and Node.js communities for their excellent documentation and resources

---

Developed with ❤️ by Liong Cheng Lex


