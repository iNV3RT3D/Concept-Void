let menus = [

]


let cards = [
    //GENERAL
    {
        id: "settings",
        title: "Settings",
        subtitle: "Change da things!",
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
    },
    //LOCATIONS
    {
        id: "conceptVoid",
        title: "The Concept Void",
        subtitle: "The only thing that can truly be created or destroyed are what we keep in our minds.",
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
        subtitle: "Home of MOST sentient void entities.",
        content: [
            {
                id: "info",
                fullDisplay: true,
                content: ``,
            }
        ]
    },
    {
        id: "drifters",
        title: "Drifters",
        subtitle: "World travelling wanders.",
        content: [
            {
                id: "info",
                fullDisplay: true,
                content: `Drifters are people who have no home origin, or are very far from it. They travel`,
            }
        ]
    },
    //SPECIES
    {
        id: "voidEntities",
        title: "Void Entities",
        subtitle: "Concept Manifestations.",
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

    {
        id: "invertedC",
        title: "iNVERTED",
        subtitle: "Sentient concept of void",
        image: "assets/icons/center.svg",
        content:
            `<hr>
            Nearly every person in the void knows of iNVERTED, given that they are the one that shaped the majority of it. 
            <br>
            iNVERTED's primary concept is 'void/nothingness', effectively making the entirety of the Concept Void an extension of themself. <br>
            As nothingness is generally seen as an unstoppable force, iNVERTED has extremely powerful reality-bending capabilities. Powerful 
            enough to ignore the usual restrictions preventing use on other beings. However, they usually only use these abilities on themself, 
            as it would be rude to use it on someone without their permission.`
    },
    {
        id: "detrevni",
        title: "DETREVNi",
        subtitle: "Sentient concept of... uh i dunno",
        image: "assets/icons/center.svg",
        content:
            ``
    },
    {
        id: "invertness",
        title: "iNVERTNESS",
        subtitle: "Sentient concept of blah blah blah",
        image: "assets/icons/center.svg",
        content:
            ``
    },

    {
        id: "nathan",
        title: "Nathan Wallis",
        subtitle: "Big Brain Human",
        image: "assets/icons/center.svg",
        content:
            ``
    },
    {
        id: "sam",
        title: "SAM",
        subtitle: "Emotional Machine",
        image: "assets/icons/center.svg",
        content:
            ``
    },
    {
        id: "sasha",
        title: "Sasha Shaw",
        subtitle: "Cool Slime",
        image: "assets/icons/center.svg",
        content:
            ``
    },
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
    }
]
