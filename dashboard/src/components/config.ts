export const sideBarConfig = {
  sidebar: [
    // {
    //   title: "API Discovery",
    //   link: "/dashboard",
    //   subTitle: [
    //     {
    //       title: "API Collection",
    //       link: "/inventory"
    //     },
    //     {
    //       title: "API Changes",
    //       link: "/changes"
    //     },
    //     {
    //       title: "Sensitive data",
    //       link: "/sensitive"
    //     }
    //   ]
    // },
    {
      title: "OpenApi Files",
      header: "API collections",
      link: "/openapi",
      subTitle: []
    },
    {
      title: "Add API",
      header: "Add New Api",
      link: "/upload",
      subTitle: []
    },
    {
      title: "All API",
      header: "List Of all Api",
      link: "/allapi",
      subTitle: []
    },
  ],
  header: {
    title: "API collections",

  },
  stats: {
    totalAPIs: 222,
    criticalAPIs: 0,
    testedAPIsCoverage: "0%",
    sensitiveInResponseAPIs: 14,
  },
  tabs: ["All"],
  tableHead: [
    "API collection name",
    "Total endpoints",
    "Risk score",
    "Test coverage",
    "Issues",
    "Sensitive data",
    "Collection type",
    "Last traffic seen",
    "Discovered"
  ],
  tableData: [
    {
      name: "All Apis",
      endpoints: 142,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "Low Risk APIs",
      endpoints: 119,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "Unauthenticated APIs",
      endpoints: 11,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "Analytics and Reporting APIs",
      endpoints: 9,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "Media APIs",
      endpoints: 9,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "Login APIs",
      endpoints: 8,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "OAuth APIs",
      endpoints: 7,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "Monitoring APIs",
      endpoints: 7,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "Search APIs",
      endpoints: 6,
      riskScore: 1,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
    {
      name: "User Management APIs",
      endpoints: 5,
      riskScore: 2,
      testCoverage: "0%",
      issues: "-",
      sensitiveData: "-",
      collectionType: "-",
      lastTrafficSeen: "1 hour ago",
      discovered: "Never",
    },
  ],
};