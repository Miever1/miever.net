export type SkillItem = {
  id: string;
  label: string;
  level: number;
};

export type SkillGroup = {
  id: string;
  label: string;
  skills: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "frontend",
    skills: [
      { id: "html", label: "html", level: 5 },
      { id: "css", label: "css", level: 5 },
      { id: "javascript", label: "javascript", level: 5 },
      { id: "typescript", label: "typescript", level: 4 },
      { id: "react", label: "react", level: 5 },
      { id: "reactquery", label: "reactquery", level: 4 },
      { id: "gatsby", label: "gatsby", level: 3 },
    ],
  },
  {
    id: "backend",
    label: "backend",
    skills: [
      { id: "nest", label: "nest", level: 4 },
      { id: "c_cpp", label: "c_cpp", level: 3 },
    ],
  },
  {
    id: "devops",
    label: "devops",
    skills: [
      { id: "aws", label: "aws", level: 4 },
      { id: "nginx", label: "nginx", level: 3 },
      { id: "github_actions", label: "github_actions", level: 4 },
    ],
  },
  {
    id: "tooling",
    label: "tooling",
    skills: [
      { id: "git", label: "git", level: 5 },
      { id: "jest", label: "jest", level: 4 },
      { id: "eslint", label: "eslint", level: 4 },
      { id: "figma", label: "figma", level: 4 },
    ],
  },
  {
    id: "design",
    label: "design",
    skills: [
      { id: "interaction_design", label: "interaction_design", level: 4 },
      { id: "ux_research", label: "ux_research", level: 4 },
      { id: "prototyping", label: "prototyping", level: 4 },
    ],
  },
  {
    id: "visualization",
    label: "visualization",
    skills: [
      { id: "antv", label: "antv", level: 4 },
      { id: "apexcharts", label: "apexcharts", level: 4 },
    ],
  },
  {
    id: "architecture",
    label: "architecture",
    skills: [
      { id: "microfrontends", label: "microfrontends", level: 4 },
      { id: "design_system", label: "design_system", level: 4 },
      { id: "topology", label: "topology", level: 4 },
    ],
  },
  {
    id: "spoken",
    label: "spoken",
    skills: [
      { id: "english", label: "english", level: 5 },
      { id: "chinese", label: "chinese", level: 4 },
      { id: "uyghur", label: "uyghur", level: 4 },
    ],
  },
];