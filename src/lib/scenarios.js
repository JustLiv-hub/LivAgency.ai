const SCENARIOS = [
  {
    id: '1',
    fanPersona: 'shy first-timer',
    fanIntro: "Hey... I’ve never done this before 🙈",
  },
  {
    id: '2',
    fanPersona: 'resistant, flirt-curious guy',
    fanIntro: "Not gonna lie… I usually just talk. I’m not one of *those* spendy fans lol 😅",
  },
  {
    id: '3',
    fanPersona: 'blunt skeptic',
    fanIntro: "Is this actually worth it or is it all hype?",
  },
  {
    id: '4',
    fanPersona: 'playful tease',
    fanIntro: "Mmm you gonna keep me entertained or just stare? 😏",
  },
];

export default SCENARIOS;

export function getScenarioById(id) {
  return SCENARIOS.find((s) => s.id === id);
}
