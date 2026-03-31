# llm_Symptom_triage_agent
System Architecture & Module Mapping
1. Core AI Concepts (Module 1)
The system operates as an intelligent agent. The Google Form acts as the perceptual interface (environment), collecting the user's current state (symptoms, sleep, stress). The Groq LLM acts as the decision-making actuator, returning a wellness path.

2. Reasoning Under Uncertainty (Module 3)
Because symptoms like "fatigue" can mean many things, the system utilizes Probabilistic Reasoning. We engineered the LLM prompt to restrict its knowledge base strictly to common student ailments, forcing it to output a primary condition alongside a probability confidence score (e.g., 80% Screen Fatigue) rather than an absolute diagnosis.

3. Unsupervised Learning & Pattern Detection (Module 4)
The backend database (Google Sheets) acts as a longitudinal tracker. We implemented a scatter plot analytics dashboard to perform anomaly detection and clustering on the relationship between sleep deprivation and student stress levels, highlighting patterns without pre-labeled outcomes.

4. Ethics, Bias & Fairness (Module 6)
To ensure compliance with AI safety standards in health tech:

The LLM prompt is demographic-agnostic (blind to age/gender/race) to prevent biased medical assumptions.

A strict boundary is maintained: the system is defined as a "Wellness Tracker," not a diagnostic tool.

Un-bypassable disclaimers are appended to all end-user Canva reports.

