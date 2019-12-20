const workshops = [
  {
    _id: "0",
    name: "Javascript practice",
    location: "Bhive Workspace",
    start: "2020-1-5",
    end: "2020-3-5",
    short_description: "Javascript basics for beginners.",
    content_descrition:
      "JavaScript is a programming language that adds interactivity to your website (for example games, responses when buttons are pressed or data is entered in forms, dynamic styling, and animation). This article helps you get started with this exciting language and gives you an idea of what is possible.",
    search_category: ["javascript", "web basics"],
    instructor_id:
      "AQm5gZzR6rwNYInAzT1GMYXlPEwx79fii1ZlAoGXR8Mf_8nCI0sMKZaEzDjNP0",
    workshop_cover:
      "https://nadia-training.com/wp-content/uploads/2019/03/JavaScript-Essentials-Course.jpg"
  },
  {
    _id: "1",
    name: "Web Security",
    location: "Code Academy at mansoura",
    start: "2019-1-5",
    end: "2019-3-5",
    short_description: "Web security basics for beginners.",
    content_descrition:
      "JavaScript is a programming language that adds interactivity to your website (for example games, responses when buttons are pressed or data is entered in forms, dynamic styling, and animation). This article helps you get started with this exciting language and gives you an idea of what is possible.",
    search_category: ["Information security", "web security"],
    instructor_id:
      "AQm5gZzR6rwNYInAzT1GMYXlPEwx79fii1ZlAoGXR8Mf_8nCI0sMKZaEzDjNP0",
    workshop_cover:
      "https://www.keycdn.com/img/blog/web-application-security-best-practices-lg.webp"
  }
];

export function getAllWorkshops() {
  return workshops;
}
