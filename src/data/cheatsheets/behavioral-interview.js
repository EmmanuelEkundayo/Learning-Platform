const behavioralInterview = {
  id: 'behavioral-interview',
  title: 'Behavioral Interview',
  color: 'violet',
  category: 'Career',
  description: 'Mastering the STAR method, handling common questions, and demonstrating soft skills',
  sections: [
    {
      title: 'The STAR Method',
      items: [
        { label: 'S - Situation', language: 'text', code: `Describe the specific event or situation`, note: 'Keep it brief; set the stage for the story' },
        { label: 'T - Task', language: 'text', code: `What did you need to accomplish?`, note: 'What was the specific goal or problem you faced?' },
        { label: 'A - Action', language: 'text', code: `Explain exactly what YOU did`, note: 'This is the most important part - focus on "I," not "we"' },
        { label: 'R - Result', language: 'text', code: `What was the outcome? Use metrics if possible.`, note: 'How did it end? What did you learn? What was the impact?' }
      ]
    },
    {
      title: 'Common Themes',
      items: [
        { label: 'Conflict Resolution', language: 'text', code: `"Tell me about a time you disagreed with a teammate"`, note: 'Focus on professionalism, empathy, and the eventual resolution' },
        { label: 'Handling Failure', language: 'text', code: `"Tell me about a time you made a mistake"`, note: 'Be honest; focus on how you took ownership and what you learned' },
        { label: 'Leadership', language: 'text', code: `"Tell me about a time you took initiative"`, note: 'Leadership isn’t just for managers - it’s about taking responsibility' },
        { label: 'Success & Impact', language: 'text', code: `"What is your proudest technical achievement?"`, note: 'Focus on the value you delivered to the business or users' }
      ]
    },
    {
      title: 'The "Introduction"',
      items: [
        { label: 'Tell me about yourself', language: 'text', code: `1. Past (Relevant background)\n2. Present (Current role & achievements)\n3. Future (Why you want this new role)`, note: 'Keep it to 2 minutes or less' },
        { label: 'Elevator Pitch', language: 'text', code: `"I am a [Role] with [X] years of experience specializing in [Tech]. My biggest impact was [Achievement]."`, note: 'Be concise and confident' }
      ]
    },
    {
      title: 'Strengths & Weaknesses',
      items: [
        { label: 'Identifying Strengths', language: 'text', code: `Choose 2-3 that are relevant to the job (e.g., adaptability, problem-solving, mentorship)`, note: 'Back them up with short examples' },
        { label: 'Handling Weaknesses', language: 'text', code: `Pick a real, non-essential weakness and explain how you are ACTIVELY improving it.`, note: 'Avoid "I work too hard" or "I am a perfectionist"' },
        { label: 'Self-Awareness', language: 'text', code: `Showing you know your limits and are coachable is a major green flag` }
      ]
    },
    {
      title: 'Why This Company?',
      items: [
        { label: 'Research the Mission', language: 'text', code: `"I admire how [Company] is leading the way in [Specific Area]..."`, note: 'Show you have done your homework' },
        { label: 'Connect to Tech Stack', language: 'text', code: `"I am excited to use [Tech] at scale because..."` },
        { label: 'Cultural Fit', language: 'text', code: `"I value [Value, e.g., transparency] which I saw mentioned in your culture blog..."` }
      ]
    },
    {
      title: 'Preparation Strategies',
      items: [
        { label: 'The Story Bank', language: 'text', code: `Prepare 5-7 versatile stories that can fit multiple different questions`, note: 'Practice them out loud!' },
        { label: 'Keywords from Job Description', language: 'text', code: `Identify the soft skills they mention (e.g., "collaborative," "fast-paced")`, note: 'Map your stories to these specific keywords' },
        { label: 'Mock Interviews', language: 'text', code: `Practice with a friend or use a recording tool to check your body language and tone`, note: 'Pay attention to "ums" and "likes"' }
      ]
    },
    {
      title: 'Questions for Interviewer',
      items: [
        { label: 'On Tech / Process', language: 'text', code: `"How do you handle technical debt while meeting deadlines?"\n"What does the code review process look like here?"` },
        { label: 'On Culture / Growth', language: 'text', code: `"How does the team handle failures or retrospectives?"\n"What is the most challenging thing the team is facing right now?"` },
        { label: 'On the Role', language: 'text', code: `"What does success look like for this role in the first 6 months?"` }
      ]
    },
    {
      title: 'Post-Interview',
      items: [
        { label: 'The Thank You Note', language: 'text', code: `Send within 24 hours. Mention a specific detail from the conversation.`, note: 'Reiterate your excitement for the role' },
        { label: 'Self-Reflection', language: 'text', code: `Write down the questions you were asked and how you answered while it’s fresh`, note: 'Use this to improve for the next one' }
      ]
    }
  ]
}

export default behavioralInterview
