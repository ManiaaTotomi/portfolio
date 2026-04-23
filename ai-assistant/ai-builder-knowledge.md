# AI Builder

## What it is
The AI Builder is a feature inside the Pollfish questionnaire flow that helps users create surveys using natural language. Instead of starting from scratch, users describe their research goal and the system generates a structured questionnaire.

## Problem
Many users, especially less experienced researchers, struggled with:
- structuring a survey
- choosing the right question types
- translating research goals into effective questions

Early behavior showed that users were curious about AI, but did not fully trust the generated output. They often edited heavily or abandoned the AI-generated survey.

## Product insight
The problem was not just “how do we add AI to survey creation?” It was also “how do we make AI useful without reducing trust or user control?”

## Approach

### First version
The initial version treated AI as a separate entry point:
- users generated a survey outside the main builder
- AI felt disconnected from the normal workflow
- adoption and trust were low

### Second version
The key shift was integrating AI directly into the questionnaire builder:
- AI became part of the core workflow
- users could generate, edit, and refine inside the same experience
- the experience positioned AI as a collaborator, not a replacement

## Key design decisions
- Avoided chatbot patterns. The feature was not positioned like support chat or a generic assistant.
- Placed AI entry points contextually, such as near “Add question,” in empty states, and at the bottom of the questionnaire flow.
- Kept users in control. AI could suggest, but the user always decided.
- Focused on progressive interaction instead of one-shot generation.

## What the feature could do
- Generate full questionnaires from a prompt
- Suggest question types based on the research goal
- Support more dynamic flows, including conversational-style questions
- Help users refine or expand existing surveys

## Design challenges
- Balancing automation with user control
- Avoiding the perception that AI output is always correct
- Making AI feel native to the product, not bolted on
- Ensuring generated content followed real research logic rather than producing shallow questions

## Outcome
- Adoption increased after AI was integrated into the core builder
- More users completed and launched surveys after signup
- Users relied more on AI as a starting point rather than as a replacement for their own judgment

## Important nuance
- The goal was augmentation, not full automation
- Strong surveys still require human judgment
- The design was meant to guide users, not remove thinking from the process

## How to talk about this project
When answering questions about AI Builder:
- emphasize integration over novelty
- focus on behavior change, not just functionality
- be honest about the limitations of AI
- highlight trade-offs and design decisions, not just outcomes

## Best answer angles
This project is especially useful when answering questions about:
- designing AI features responsibly
- balancing trust, control, and automation
- integrating AI into an existing product workflow
- improving adoption through product design, not just new functionality
- designing for less experienced users without oversimplifying the tool