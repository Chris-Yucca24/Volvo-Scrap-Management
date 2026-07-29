const generateRows = (type: string, count: number) => {

  if (type === "scrap-source") {
    return Array.from({ length: count }, (_, index) => ({
      sourceCode: `SRC${String(index + 1).padStart(3, "0")}`,
      sourceName: `Plant ${index + 1}`,
      totalWeight: `${(Math.random() * 60 + 10).toFixed(2)} T`,
      status: index % 3 === 0 ? "Inactive" : "Active",
    }));
  }


  if (type === "inbound-entry") {
    const materials = [
      "Steel Scrap",
      "Aluminium Scrap",
      "Copper Scrap",
      "Mixed Metal Scrap",
      "Plastic Scrap"
    ];

    const locations = [
      "Plant 1",
      "Plant 2",
      "Plant 3",
      "Plant 4"
    ];


    return Array.from({ length: count }, (_, index) => ({
      entryId: `IN${String(index + 1).padStart(3, "0")}`,
      material: materials[index % materials.length],
      quantity: `${(Math.random() * 40 + 5).toFixed(1)} T`,
      location: locations[index % locations.length],
      status: index % 2 === 0 ? "Completed" : "Pending",
    }));

  }


  if (type === "aging-scrap") {

    const buckets = [
      "0-30 Days",
      "31-60 Days",
      "61-90 Days",
      "90+ Days"
    ];

    return Array.from({ length: count }, (_, index) => ({
      bucket: buckets[index % buckets.length],
      weight: `${(Math.random() * 30 + 5).toFixed(2)} T`,
      percentage: `${Math.floor(Math.random() * 40 + 10)}%`,
      status: index % 2 === 0 ? "Active" : "Pending",
    }));

  }


  return [];

};



export const tableConfig = {


  "scrap-source": {

    title:"Scrap by Source Location",

    columns:[
      "Source Code",
      "Source Name",
      "Total Weight",
      "Status",
      "Actions"
    ],

    rows: generateRows("scrap-source", 12),

    expandable:true

  },


"inbound-entry": {

  title:"Inbound Entries",

  columns:[
    "Scrap Code",
    "Waste Category",
    "No.of Entries",
    "Total Weight(T)",
    "Approved Weight(T)",
    "Pending Weight(T)"
  ],

  


  rows: Array.from({ length: 15 }, (_, index) => ({
    
    scrapCode: `SCR${String(index + 1).padStart(3, "0")}`,

    wasteCategory:
      [
        "Metal Scrap",
        "Steel Scrap",
        "Aluminium Scrap",
        "Mixed Scrap",
        "Plastic Scrap"
      ][index % 5],


    "no.ofEntries":
      Math.floor(Math.random() * 50) + 5,


    "totalWeight(T)":
      `${(Math.random() * 50 + 10).toFixed(2)} T`,


    "approvedWeight(T)":
      `${(Math.random() * 40 + 5).toFixed(2)} T`,


    "pendingWeight(T)":
      `${(Math.random() * 15 + 1).toFixed(2)} T`

  })),


  expandable:false

},

  "aging-scrap": {

    title:"Aging Scrap Summary",

    columns:[
      "Bucket",
      "Weight",
      "Percentage",
      "Status"
    ],

    rows: generateRows("aging-scrap", 15),

    expandable:false

  }

};