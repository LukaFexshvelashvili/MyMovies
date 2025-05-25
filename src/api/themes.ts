export const addons = [
  {
    id: 0,
    title: "ჩვენ სერვერზე",
  },
  {
    id: 1,
    title: "ქართულად",
  },
  {
    id: 2,
    title: "ინგლისურად",
  },
  {
    id: 3,
    title: "HD",
  },
  {
    id: 4,
    title: "2K",
  },
  {
    id: 5,
    title: "4K",
  },
  {
    id: 6,
    title: "16+",
  },
  {
    id: 7,
    title: "18+",
  },
  {
    id: 8,
    title: "ანონსი",
  },
  {
    id: 9,
    title: "თრეილერი",
  },
  {
    id: 10,
    title: "სუბტიტრებით",
  },
  {
    id: 11,
    title: "ნახლდება",
  },
];
export const types = [
  {
    id: 0,
    title: "ფილმი",
    color: "#D10345",
    bgcolor: "rgba(209, 3, 68, 0.1)",
  },
  {
    id: 1,
    title: "სერიალი",
    color: "#1699ea",
    bgcolor: "rgba(0, 121, 235, 0.1)",
  },
  {
    id: 2,
    title: "ანიმაცია",
    color: "#1ad15a",
    bgcolor: "rgba(26, 209, 90, 0.1)",
  },
  {
    id: 3,
    title: "ანიმე",
    color: "#db00eb",
    bgcolor: "rgba(219, 0, 235, 0.1)",
  },
];
export type TGenre = {
  title: string;
  color: string;
  bgcolor: string;
  image: string;
};
export const genres = [
  {
    title: "ანიმაციური",
    color: "#67c800",
    bgcolor: "rgba(103, 200, 0, 0.7718)",
    image: "https://cdn.moviesgo.ge/uploads/29/twyDMhn_sm2.webp",
  },
  {
    title: "ბიოგრაფიული",
    color: "#EBAC00",
    bgcolor: "rgba(235, 172, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/512/t5BmLjc_sm2.webp",
  },
  {
    title: "დრამა",
    color: "#D10345",
    bgcolor: "rgba(209, 3, 68, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/226/tWxkbyJ_sm2.webp",
  },
  {
    title: "დოკუმენტური",
    color: "#EB005E",
    bgcolor: "rgba(235, 0, 94, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/422/tbFUduR_sm2.webp",
  },
  {
    title: "დეტექტივი",
    color: "#00AAD9",
    bgcolor: "rgba(0, 170, 217, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/822/trB40p1_sm2.webp",
  },
  // {
  //   title: "დორამები",
  //   color: "#ae00d9",
  //   bgcolor: "rgba(137, 0, 217, 0.1)",
  //   image: "image_url",
  // },
  {
    title: "ეროტიკული",
    color: "#c80000",
    bgcolor: "rgba(200, 0, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/701/tRovczl_sm2.webp",
  },
  {
    title: "ვესტერნი",
    color: "#eb8100",
    bgcolor: "rgba(235, 129, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/781/tTgUo75_sm2.webp",
  },
  {
    title: "თრილერი",
    color: "#EB2F00",
    bgcolor: "rgba(235, 47, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/767/tgCtYap_sm2.webp",
  },
  {
    title: "თურქული სერიალები",
    color: "#eb0000",
    bgcolor: "rgba(235, 47, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/255/tac438O_sm2.webp",
  },
  {
    title: "თურქული ფილმები",
    color: "#eb2f00",
    bgcolor: "rgba(235, 74, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/555/tCITLji_sm2.webp",
  },
  {
    title: "ისტორიული",
    color: "#F4C60B",
    bgcolor: "rgba(244, 197, 11, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/55/teTxKFL_sm2.webp",
  },
  {
    title: "ინტელექტუალური",
    color: "#8684ff",
    bgcolor: "rgba(134, 132, 255, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/829/tgnnn3H_sm2.webp",
  },
  {
    title: "კომედია",
    color: "#ebb400",
    bgcolor: "rgba(235, 180, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/758/t73ulc1_sm2.webp",
  },
  {
    title: "კრიმინალური",
    color: "#b5b5b5",
    bgcolor: "rgba(181, 181, 181, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/674/t3jjWzJ_sm2.webp",
  },
  {
    title: "მაგიური",
    color: "#8d00eb",
    bgcolor: "rgba(141, 0, 235, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/632/thHXF1v_sm2.webp",
  },
  {
    title: "მისტიკა",
    color: "#DF00EB",
    bgcolor: "rgba(223, 0, 235, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/46/tLu4ums_sm2.webp",
  },
  {
    title: "მისტიური",
    color: "#7900eb",
    bgcolor: "rgba(121, 0, 235, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/609/tCyqape_sm2.webp",
  },
  {
    title: "მძაფრ-სიუჟეტიანი",
    color: "#EB7D00",
    bgcolor: "rgba(235, 125, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/674/t3jjWzJ_sm2.webp",
  },
  {
    title: "მელოდრამა",
    color: "#EB0071",
    bgcolor: "rgba(235, 0, 114, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/28/tSO124n_sm2.webp",
  },
  {
    title: "მიუზიკლი",
    color: "#DD0051",
    bgcolor: "rgba(221, 0, 81, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/121/tpSfM2F_sm2.webp",
  },
  {
    title: "მუსიკალური",
    color: "#dd00ad",
    bgcolor: "rgba(221, 0, 203, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/181/ty9DUmp_sm2.webp",
  },
  {
    title: "მოკლემეტრაჟიანი",
    color: "#EB6E00",
    bgcolor: "rgba(235, 110, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/570/tLWliwQ_sm2.webp",
  },
  {
    title: "რომანტიკა",
    color: "#eb00b4",
    bgcolor: "rgba(235, 0, 180, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/673/tc8EJtf_sm2.webp",
  },
  {
    title: "საახალწლო",
    color: "#00d71d",
    bgcolor: "rgba(0, 215, 29, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/12/tNb8LSI_sm2.webp",
  },
  {
    title: "სამეცნიერო",
    color: "#00a5d7",
    bgcolor: "rgba(0, 165, 215, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/764/tH0C2Kf_sm2.webp",
  },
  {
    title: "საბავშვო",
    color: "#67c800",
    bgcolor: "rgba(103, 200, 0, 0.7718)",
    image: "https://cdn.moviesgo.ge/uploads/16/t9Z6SqD_sm2.webp",
  },
  {
    title: "სათავგადასავლო",
    color: "#00C317",
    bgcolor: "rgba(0, 195, 23, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/813/tR7OySJ_sm2.webp",
  },
  {
    title: "საბრძოლო ხელოვნება",
    color: "#00c4e3",
    bgcolor: "rgba(0, 197, 227, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/367/tPgnPjF_sm2.webp",
  },
  {
    title: "საშინელებათა",
    color: "#DB0004",
    bgcolor: "rgba(219, 0, 4, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/234/tRiMtmT_sm2.webp",
  },
  {
    title: "საომარი",
    color: "#00893E",
    bgcolor: "rgba(0, 137, 62, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/251/tMWh1XR_sm2.webp",
  },
  {
    title: "საოჯახო",
    color: "#0091EB",
    bgcolor: "rgba(0, 145, 235, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/227/tQXhDuK_sm2.webp",
  },
  {
    title: "სპორტული",
    color: "#FF9215",
    bgcolor: "rgba(255, 146, 21, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/819/tM2zSaR_sm2.webp",
  },
  {
    title: "ფენტეზი",
    color: "#a100eb",
    bgcolor: "rgba(149, 0, 235, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/699/tns9uFW_sm2.webp",
  },
  {
    title: "ფანტასტიკა",
    color: "#C400EB",
    bgcolor: "rgba(196, 0, 235, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/683/tEQJhSH_sm2.webp",
  },
  {
    title: "ქართული",
    color: "#d99400",
    bgcolor: "rgba(217, 148, 0, 0.1)",
    image: "https://cdn.moviesgo.ge/uploads/672/ti9RRIz_sm2.webp",
  },
];
export const languages = [
  {
    title: "ქართულად",
  },
  {
    title: "ინგლისურად",
  },
  {
    title: "რუსულად",
  },
];
export const years = [
  {
    title: "2025",
  },
  {
    title: "2024",
  },
  {
    title: "2023",
  },
  {
    title: "2022",
  },
  {
    title: "2021",
  },
  {
    title: "2020",
  },
  {
    title: "2019",
  },
  {
    title: "2018",
  },
  {
    title: "2017",
  },
  {
    title: "2016",
  },
];
export const imdbs = [
  {
    title: "9.0+",
  },
  {
    title: "8.0+",
  },
  {
    title: "7.0+",
  },
  {
    title: "6.0+",
  },
  {
    title: "5.0+",
  },
  {
    title: "4.0+",
  },
  {
    title: "3.0+",
  },
  {
    title: "2.0+",
  },
  {
    title: "1.0+",
  },
];
