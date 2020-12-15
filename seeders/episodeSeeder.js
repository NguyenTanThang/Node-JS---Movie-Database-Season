/*
const Episode = require("../models/Episode");
var {connectDBWithURI} = require("../config/db");
const MONGODB_URI = `mongodb+srv://fatman:123456a@blog.yrv4b.mongodb.net/movie-database-season?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

const seasonID = "5fd1cabf64ad0b0017a33c78";
let episodeNumStartAt = 7;

const episodes = [
    {
        name: "Toshikazu Hazamada (Surface) / Toshikazu Hazamada (Show Off)",
        description: "Kobayashi informs Josuke and Koichi about a Stand user in their school named Toshikazu Hazamada who allegedly caused his friend to gouge his own eye out. While investigating Hazamada's locker, Josuke comes across Hazamada's Stand Surface,[i] a wooden dummy which turns into a copy of Josuke and takes control of his movements. After seemingly defeating both Josuke and Koichi, Hazamada aims to use his Josuke copy to lure Jotaro into a trap. Having used their respective abilities to protect each other from Hazamada's attack, Josuke and Koichi use their Stands' powers to meet up with Jotaro before Hazamada and Surface. Surface takes control of Josuke and tries to have him kill Jotaro in his stead. But two bikers Hazamada had attacked on the way to the meeting place dish out their revenge after learning of his plans from Josuke."
    },
    {
        name: "Yukako Yamagishi Falls in Love, Part 1",
        description: "Koichi meets with his classmate Yukako Yamagishi who confesses her love for him, but also loses her temper at the thought of being turned down. When she leaves, Koichi realizes that her hair has been left behind in his drink. The next day, Yukako becomes angered with the class representative for insulting Koichi, using her Stand Love Deluxe, which allows her to control her own hair, to attempt to burn the class rep alive. After Josuke and Okuyasu arrive to save the class rep, they warn Koichi about Yukako's Stand and encourage him to try and act like a delinquent so that she will lose interest. This plan backfires, and Yukako kidnaps Koichi and brings him to an abandoned summer villa, where she begins torturing him in an attempt to mold him into the perfect gentleman.",
    },
    {
        name: "Yukako Yamagishi Falls in Love, Part 2",
        description: "While looking for a way to escape, Koichi finds a nearby payphone and uses Echoes' ability to trick Yukako into contacting Josuke, which clues him and Okuyasu in on their location. As Koichi attempts to survive Yukako's fury until Josuke arrives, Echoes suddenly evolves into a new form, Echoes Act 2, which can turn the sound effects it writes into real actions when touched. Yukako endures several counterattacks from Act 2, but she is literally blown away onto a nearby cliff, which gives way underneath her. Just as Yukako falls towards some sharp rocks below, she is saved by bouncy sound effects already placed there by Koichi, turning them into harmless springs. As Koichi reunites with Josuke and Okuyasu, Yukako gains an all-new admiration for Koichi, who had saved her despite everything she had done to him.",
    },
    {
        name: "Let's Go Eat Some Italian Food",
        description: "On their way to Keicho's grave, Josuke and Okuyasu come across an Italian restaurant called Trattoria Trussardi,[j] run by Chef Tonio Trussardi,[k] who makes dishes based on the observations of his customers. Upon trying each of Tonio's dishes, Okuyasu experiences violent reactions within his body, such as his eyes being squeezed of their moisture and his teeth launching out, only to find they have ultimately benefited him by curing his various maladies. Growing suspicious, Josuke discovers that Tonio had been supplementing his dishes with his Stand, Pearl Jam,[l] and confronts him. After a brief scuffle, Josuke discovers that Tonio had only acted hostile towards him for not washing his hands before entering the kitchen. Tonio reveals that he simply wants to help his customers. He explains that he senses maladies his customers may be ailing from, and creates dishes that he infuses with Pearl Jam, which heals the customers' maladies and improves their health. Tonio then puts Josuke to work scrubbing the kitchen for his actions. Meanwhile, Jotaro meets with a representative of the Speedwagon Foundation, who informs him Joseph Joestar is on his way to Morioh.",
    },
    {
        name: "Red Hot Chili Pepper, Part 1 / Chili Pepper, Part 1",
        description: "Red Hot Chili Pepper challenges Josuke at home to see if he is strong enough to take on Jotaro and Star Platinum. Despite Crazy Diamond's show of strength and speed, Chili Pepper shows off his own strength before retreating. The next day, Jotaro calls on Josuke, Okuyasu, and Koichi to inform them that Joseph, whose Stand Hermit Purple can potentially detect Chili Pepper's user, is due to arrive at the port. Having heard the whole conversation, Chili Pepper appears from Okuyasu's motorcycle's battery and attempts to escape only to be stopped by Okuyasu. Despite being severely weakened, Chili Pepper goads Okuyasu into attacking him once more, unearthing an underground electrical cable which allows him to regain his strength. After cutting off Okuyasu's arm, Chili Pepper drags the rest of his body into the cable. Josuke uses Crazy Diamond on Okuyasu's severed arm, which takes his body away from Chili Pepper before he can be killed, and heals him. Josuke and Jotaro head to the port to save Joseph from the ambush.",
    },
    {
        name: "Red Hot Chili Pepper, Part 2 / Chili Pepper, Part 2",
        description: "Jotaro and Okuyasu head off to rendezvous with Joseph's ship while Josuke and Koichi stay on the docks, where they are confronted by Chili Pepper's user, Akira Otoishi. Otoishi hides Chili Pepper in the underground wires to launch surprise attacks on Josuke from all directions, but Josuke turns the surrounding asphalt back into coal tar, allowing him to predict Chili Pepper's movements. Angered, Otoishi uses all the electricity in Morioh Town to power Chili Pepper up. However, Josuke traps Chili Pepper in a tire and tricks him into bursting out, causing the air inside to blow him into the ocean. The combination of the ocean's size and the conductivity of saltwater cause Chili Pepper to dissolve. Otoishi survives and sneaks onto Joseph's boat disguised as a member of the Speedwagon Foundation, but Okuyasu stops him when he decides to punch both Otoishi and the real Speedwagon Foundation member. Josuke finally meets Joseph.",
    },
    {
        name: "We Picked Up Something Crazy!",
        description: "Jotaro retrieves the bow and arrow, and urges the others to be careful of any other Stand users that might have been created. As Josuke tries to escort Joseph back to his house to meet Tomoko, Joseph finds an invisible baby girl who is a Stand user. After buying a large amount of baby accessories with Josuke's credit card, Joseph attempts to add clothes and makeup to the baby to make her visible, only for her Stand Achtung Baby to activate when she starts crying, causing everything around her, including Joseph's hands, to turn invisible. As the baby gets more upset and her Stand's powers strengthen, her stroller rolls away into a nearby river. Joseph, upset that Josuke sees him as a burden, slits open his wrist, using his blood to help Josuke find the baby in the river. Josuke becomes amazed by Joseph's self-sacrifice, only to later learn Joseph had spent nearly all of his savings on baby goods when he discovers the sales receipt in Joseph's pocket.",
    },
    {
        name: "Let's Go to the Manga Artist's House, Part 1",
        description: "Upon discovering their mutual interest in the manga Pink Dark Boy, Hazamada brings Koichi to the home of its artist, Rohan Kishibe, who gives them a tour of his studio. Koichi and Hazamada sneak a peek at Rohan's new manuscript. The moment they do this, they fall under the power of Rohan's Stand, Heaven's Door, which allows him to open their bodies like a book and read all of their secrets. After learning of Koichi's encounters with Stand users, Rohan writes a safety lock in one of Koichi's pages, preventing Koichi from attacking him. He then proceeds to take pages from both Koichi and Hazamada as material for his manga, leaving them with no memory of what just happened. That night, Koichi senses something amiss when he discovers he has lost 20kg, but suddenly forgets about it just as he prepares to inform Josuke. The next day, Koichi finds himself at Rohan's house again, with Josuke and Okuyasu following closely behind.",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    },
    {
        name: "",
        description: "",
    }
]

let counter = 0;

const seed = async () => {
    const conn = connectDBWithURI(MONGODB_URI);

    genres.forEach(async genre => {
        await new Genre(genre).save();
        counter++;
        if (counter === genres.length) {
            mongoose.connection.close();
        }
    })
}

seed();
*/