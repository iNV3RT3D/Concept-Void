let menus = [

]


let cards = [
    //GENERAL
    {
        id: "settings",
        title: "Settings",
        subtitle: "Change da things!",
        color: "#6a0085",
        content: [
            {
                id: "music",
                title: "Music",
                noClick: true,
                separator: true,
            },
            {
                id: "volume",
                noClick: true,
                fullDisplay: true,
                banner: true,
                content:
                    `VOLUME
                    <input type='range' id="musicVolumeSlider" class='card-slider' min="0" max="1" step="0.01">`,
                startFunc: function(){
                    const slider = document.getElementById("musicVolumeSlider");
                    slider.value = primaryGain.gain.value;
                    slider.oninput = function(){
                        primaryGain.gain.value = this.value;
                    }
                    slider.onchange = function(){
                        localStorage.setItem('musicVolume', this.value.toString());
                    }
                }
            }
        ]
    },
    {
        id: "about",
        title: "About Me",
        subtitle: "I do things, sometimes.",
        musicPreset: 'primary',
        color: "#6a0085",
        content: [
            {
                id: "info",
                fullDisplay: true,
                banner: true,
                noClick: true,
                title: `Hello!`,
                content: `Welcome to my site! Most people know me by the name iNVERTED, but I've had many others. I'm someone who just can't seem
                to stick to one thing, so I might as well do it all! While the thing I considered myself best at is programming, I've done some stuff in
                digital art, 3D model creation / animation, as well as made some attempts at creating a game. Hopefully, I'll eventually get examples of all 
                that stuff here for you to look at.`
            },
            {
                id: "links",
                title: "Links",
                separator: true,
                noClick: true,
            },
            {groupId: "links"}
        ]
    },
    //LOCATIONS
    {
        id: "conceptVoid",
        title: "The Concept Void",
        subtitle: "Place of lost ideas.",
        musicPreset: 'primary',
        color: "#6a0085",
        content: [
            {
                id: "info",
                fullDisplay: true,
                banner: true,
                noClick: true,
                content: `When some aspect of the mind is forgotten, such as an idea, memory, or concept, it doesn't disappear. It gathers in the concept void to eventually take form.`,
            },
            {
                id: "important",
                title: "Important Information",
                subtitle: "Explains some things",
                separator: true,
                noClick: true,
            },
            {
                cardId: "voidEntities",
            },
            {
                cardId: "voidCity",
            }
        ]
    },
    {
        id: "voidCity",
        title: "Void City",
        subtitle: "Home of sentient void entities.",
        musicPreset: 'voidCity',
        color: "#6a0085",
        content: [
            {
                id: "info",
                fullDisplay: true,
                content: `Most void entities can be found in cities like this one, going about their day. These cities are constantly expanding as more void entities form and move in.`,
                noClick: true,
                banner: true,
            },
            {
                cardId: "conceptVoid",
            },
            {
                cardId: "voidEntities",
            },
            {
                id: "individuals",
                title: "Citizens",
                noClick: true,
                separator: true,
            },
            {
                groupId: "voidEntities",
            }
        ]
    },
    {
        id: "drifters",
        title: "Drifters",
        subtitle: "World travelling wanders.",
        musicPreset: 'drifters',
        color: "#2c5291",
        content: [
            {
                id: "info",
                title: "Who are Drifters?",
                fullDisplay: true,
                banner: true,
                noClick: true,
                content: `Drifters are people who have no home origin, or are very far from it. They frequently travel worlds in their pursuits.`,
            },
            {
                id: "lostCategory",
                title: "Nate crew",
                fullDisplay: true,
                noClick: true,
                separator: true,
            },
            {groupId: "lost"}
        ]
    },
    //SPECIES
    {
        id: "voidEntities",
        title: "Void Entities",
        subtitle: "Concept Manifestations.",
        color: "#6a0085",
        content: [
            {
                id: "info",
                title: "What are Void Entities?",
                banner: true,
                noClick: true,
                fullDisplay: true,
                content:
                    `As concepts in the void drift, occasionally enough can gather together take a physical form. That is what void entities are, a physical manifestation of concepts. A void entity is still capable of gathering more concepts after forming.<br>
                    <h4>Sentient Void Entities</h4>
                    In the rare case that enough aspects of what a mind is collect together, void entities can gain the ability to think. Since void entities are concepts, and sentient void entities are capable of thinking of concepts, nearly all sentient void entities are shape-shifters and reality-benders. The extent of these abilities vary greatly.<br><br>
                    A void entity's reality-bending almost never works directly on other sentient beings, void entity or not, due to conflicting with a person's concept of self.`
            },
            {groupId: "voidEntities"}
        ]
    },
    //MISC
    {
        id: "otherCharacters",
        title: "Other Characters",
        subtitle: "Random characters I've created with no story.",
        musicPreset: 'primary',
        color: "#a84600",
        content: [
            {
                id: "info",
                banner: true,
                noClick: true,
                fullDisplay: true,
                content:
                    `A collection of characters I've not yet granted a larger story, and therefore have no designated place.`
            },
            {groupId: "otherCharacters"}
        ]
    },
    //CHARACTERS
    {
        id: "invertedC",
        title: "iNVERTED",
        subtitle: "Sentient concept of void",
        image: "assets/images/reference/voidentities/iNVERTEDIcon.png",
        layout: "character",
        content:
            `Nearly every person in the void knows of iNVERTED, given that they are the one that shaped the majority of it. 
            <br>
            iNVERTED's primary concept is 'void/nothingness', effectively making the entirety of the Concept Void an extension of themself. <br>
            As nothingness is generally seen as an unstoppable force, iNVERTED has extremely powerful reality-bending capabilities. Powerful 
            enough to ignore the usual restrictions preventing use on other beings. However, they usually only use these abilities on themself, 
            as it would be rude to use it on someone without their permission.`
    },
    {
        id: "detrevni",
        title: "DETREVNi",
        subtitle: "Mischievous Trouble-Maker",
        image: "assets/icons/center.svg",
        layout: "character",
        content:
            ``
    },
    {
        id: "invertness",
        title: "iNVERTNESS",
        subtitle: "Fox-girl Void Entity!??!?",
        image: "assets/icons/center.svg",
        layout: "character",
        content:
            ``
    },

    {
        id: "nathan",
        title: "Nathan Wallis",
        subtitle: "Big Brain Human",
        image: "assets/images/reference/drifters/Nate.png",
        layout: "character",
        content:
            `Nathan is a workaholic roboticist and the creator of SAM. He frequently gets lost in his work, originally interacting little with anyone other than SAM.
            He tends to very blunt and literal with his speech, and easily misses hidden meanings in other people's words.
            <br><br>
            Overconfident in his knowledge, he often forgoes safety precautions and warnings given by SAM, believing "Everything will be fine." That is, 
            until one of Nathan's experiments get them stranded in another world.`
    },
    {
        id: "sam",
        title: "SAM",
        subtitle: "Emotional Machine",
        image: "assets/icons/center.svg",
        layout: "character",
        content:
            `SAM is an AI created by Nathan Wallis to assist in matters outside his skill set. Capable of experiencing the full range of human emotion,
            they're often described as more human than Nathan. Nearly every piece of technology Nathan has created is designed with some system allowing 
            SAM to monitor and interact with it freely.
            <br><br>
            When Nathan was being pulled into another world, SAM transferred themself into the portable AI module also being pulled in nearby, in order
            to follow Nathan.`
    },
    {
        id: "sasha",
        title: "Sasha Shaw",
        subtitle: "Cool Slime",
        image: "assets/images/reference/drifters/Sasha.png",
        layout: "character",
        content:
            `Sasha is a slime with abnormal, human-like intelligence due to a rare condition. She was found by Nathan and SAM some time after their first
            accidental warp, before she took a human form.
            <br><br>
            During her time with Nathan and SAM, she took on a human appearance and a more battle hungry personality. Despite Nathan's many attempts to prevent
            such, Sasha frequently ends up dragging the group into fights they would rather not be in.`
    },

    {
        id: "avery",
        title: "Avery",
        subtitle: "Moth",
        image: "assets/icons/center.svg",
        layout: "character",
        content:
            ``
    },
    {
        id: "sona",
        title: "Sona",
        subtitle: "Advanced Humanoid Machine",
        image: "assets/icons/center.svg",
        layout: "character",
        content:
            ``
    },

    //LINKS
    {
        id: "youtube",
        title: "YouTube",
        image: "assets/icons/links/youtube.svg",
        redirect: "https://www.youtube.com/@PhaseReality"
    }
]

let cardGroups = [
    {
        id: "voidEntities",
        cards: [
            {cardId: "invertedC"},
            {cardId: "detrevni"},
            {cardId: "invertness"}
        ]
    },
    {
        id: "drifters",
        cards: [
            {cardId: "nathan"},
            {cardId: "sam"},
            {cardId: "sasha"}
        ]
    },
    {
        id: "lost",
        cards: [
            {cardId: "nathan"},
            {cardId: "sam"},
            {cardId: "sasha"}
        ]
    },
    {
        id: "otherCharacters",
        cards: [
            {cardId: "avery"},
            {cardId: "sona"},
        ]
    },

    {
        id: "links",
        cards: [
            {cardId: "youtube"}
        ]
    }
]
