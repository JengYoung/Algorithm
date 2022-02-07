const skill = "CBD";

const skill_trees = ["BACDE", "CBADF", "AECB", "BDA"];

const solution = (skill, skill_trees) => {
  let answer = 0;
  for (let skillTree of skill_trees) {
    const filteredTree = [...skillTree]
      .filter((s) => [...skill].includes(s))
      .join("");
    const filteredSkill = [...skill].slice(0, filteredTree.length).join("");

    if (filteredSkill === filteredTree) answer += 1;
  }

  return answer;
};

console.log(solution(skill, skill_trees));
