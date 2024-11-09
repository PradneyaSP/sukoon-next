// src/data/questions.ts

import { Question } from "@/types/assessment";

export const commonAssessment: Question[] = [
  { id: 1, question: "Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
  // Add all 20 questions for the common assessment
];

export const disorderAssessments: Record<string, Question[]> = {
  depression:
    [
      {
        "id": 1,
        "question": "Little interest or pleasure in doing things",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 2,
        "question": "Feeling down, depressed, or hopeless",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 3,
        "question": "Trouble falling or staying asleep, or sleeping too much",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 4,
        "question": "Feeling tired or having little energy",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 5,
        "question": "Poor appetite or overeating",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 6,
        "question": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 7,
        "question": "Trouble concentrating on things, such as reading the newspaper or watching television",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 8,
        "question": "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 9,
        "question": "Thoughts that you would be better off dead, or of hurting yourself",
        "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        "id": 10,
        "question": "If you checked off any problems, how difficult have these problems made it for you at work, home, or with other people?",
        "options": ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"]
      }
    ],

  anxiety: [
    {
      "id": 1,
      "question": "Feeling nervous, anxious, or on edge",
      "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      "id": 2,
      "question": "Not being able to stop or control worrying",
      "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      "id": 3,
      "question": "Worrying too much about different things",
      "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      "id": 4,
      "question": "Trouble relaxing",
      "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      "id": 5,
      "question": "Being so restless that it is hard to sit still",
      "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      "id": 6,
      "question": "Becoming easily annoyed or irritable",
      "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      "id": 7,
      "question": "Feeling afraid, as if something awful might happen",
      "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    }
  ],
  'bipolar-disorder': [
    {
      "id": 1,
      "question": "Has there ever been a period of time when you were not your usual self and you felt so good or hyper that other people thought you were not your normal self or were so hyper that you got into trouble?",
      "options": ["Yes", "No"]
    },
    {
      "id": 2,
      "question": "You were so irritable that you shouted at people or started fights or arguments?",
      "options": ["Yes", "No"]
    },
    {
      "id": 3,
      "question": "You felt much more self-confident than usual?",
      "options": ["Yes", "No"]
    },
    {
      "id": 4,
      "question": "You got much less sleep than usual and found you didn’t really miss it?",
      "options": ["Yes", "No"]
    },
    {
      "id": 5,
      "question": "You were much more talkative or spoke much faster than usual?",
      "options": ["Yes", "No"]
    },
    {
      "id": 6,
      "question": "Thoughts raced through your head or you couldn’t slow your mind down?",
      "options": ["Yes", "No"]
    },
    {
      "id": 7,
      "question": "You were so easily distracted by things around you that you had trouble concentrating or staying on track?",
      "options": ["Yes", "No"]
    },
    {
      "id": 8,
      "question": "You had much more energy than usual?",
      "options": ["Yes", "No"]
    },
    {
      "id": 9,
      "question": "You were much more social or outgoing than usual, for example, you telephoned friends in the middle of the night?",
      "options": ["Yes", "No"]
    },
    {
      "id": 10,
      "question": "You were much more interested in sex than usual?",
      "options": ["Yes", "No"]
    },
    {
      "id": 11,
      "question": "You did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?",
      "options": ["Yes", "No"]
    },
    {
      "id": 12,
      "question": "Spending money got you or your family into trouble?",
      "options": ["Yes", "No"]
    },
    {
      "id": 13,
      "question": "If you checked YES to more than one of the above, have several of these ever happened during the same period of time?",
      "options": ["Yes", "No"]
    },
    {
      "id": 14,
      "question": "How much of a problem did any of these cause you? Like being unable to work; having family, money or legal troubles; getting into arguments or fights?",
      "options": ["No Problem", "Minor Problem", "Moderate Problem", "Serious Problem"]
    },
    {
      "id": 15,
      "question": "Have any of your blood relatives had manic-depressive illness or bipolar disorder? (i.e. Children, siblings, parents, grandparents, aunts, and uncles)",
      "options": ["Yes", "No"]
    },
    {
      "id": 16,
      "question": "Has a health professional ever told you that you have manic-depressive illness or bipolar disorder?",
      "options": ["Yes", "No"]
    }
  ],
  adhd: [
    {
      "id": 1,
      "question": "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 2,
      "question": "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 3,
      "question": "How often do you have problems remembering appointments or obligations?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 4,
      "question": "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 5,
      "question": "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 6,
      "question": "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 7,
      "question": "How often do you make careless mistakes when you have to work on a boring or difficult project?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 8,
      "question": "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 9,
      "question": "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 10,
      "question": "How often do you misplace or have difficulty finding things at home or at work?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 11,
      "question": "How often are you distracted by activity or noise around you?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 12,
      "question": "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 13,
      "question": "How often do you feel restless or fidgety?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 14,
      "question": "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 15,
      "question": "How often do you find yourself talking too much when you are in social situations?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 16,
      "question": "When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 17,
      "question": "How often do you have difficulty waiting your turn in situations when turn taking is required?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      "id": 18,
      "question": "How often do you interrupt others when they are busy?",
      "options": ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    }
  ]
};
