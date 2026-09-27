import flowers from "../assets/images/categories/flowers.jpeg";
import bouquets from "../assets/images/categories/bouquet.jpeg";
import plushies from "../assets/images/categories/plushies.jpeg";
import keychain from "../assets/images/categories/keychain.png";
import decor from "../assets/images/occasions/wedding.jpg";
import gifts from "../assets/images/occasions/baby.jpg";

const categories = [

{
id:1,
name:"Flowers",
slug:"flowers",
image:flowers,
description:"Handmade crochet flowers.",
featured:true,
status:"Active",
displayOrder:1,
productCount:18,
createdAt:"2026-07-10",
},

{
id:2,
name:"Bouquets",
slug:"bouquets",
image:bouquets,
description:"Crochet bouquet collection.",
featured:true,
status:"Active",
displayOrder:2,
productCount:24,
createdAt:"2026-07-10",
},

{
id:3,
name:"Plushies",
slug:"plushies",
image:plushies,
description:"Cute crochet plush toys.",
featured:true,
status:"Active",
displayOrder:3,
productCount:11,
createdAt:"2026-07-10",
},


{
id:4,
name:"Keychain",
slug:"keychain",
image:keychain,
description:"Cute keychain.",
featured:false,
status:"Active",
displayOrder:4,
productCount:9,
createdAt:"2026-07-10",
},

{
id:5,
name:"Home Decor",
slug:"home-decor",
image:decor,
description:"Crochet decor.",
featured:false,
status:"Inactive",
displayOrder:5,
productCount:6,
createdAt:"2026-07-10",
},

{
id:6,
name:"Gift Boxes",
slug:"gift-boxes",
image:gifts,
description:"Customized crochet gifts.",
featured:true,
status:"Active",
displayOrder:6,
productCount:8,
createdAt:"2026-07-10",
},

];

export default categories;