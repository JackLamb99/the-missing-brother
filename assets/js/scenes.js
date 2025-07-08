const scenes = {
    // Prologue scenes
    prologue: {
        background: 'prologue',
        header: `PROLOGUE
            The Missing Brother`,
        text: ({name, pronounPossessive}) => `
            <p class="text-center"><i class="fa-solid fa-location-dot"></i> BERMONDSEY, LONDON - LATE MORNING, MARCH, 1949</p>
            <p>The office smells of cigarettes and old paper. A ceiling fan clicks slowly overhead, stirring the smoke around 
            the room as it rises from a heavy glass ashtray. Rain patters against the glass windows in steady rhythm, pooling 
            along the sill. The walls are lined with filing cabinets, their drawers overflowing. A half-empty bottle of whisky 
            rests beside the loaded ashtray on the desk, the only real furniture aside from a few tattered chairs and a crooked 
            coat rack. There's a tension in the air, the kind you could cut with a knife... or a question.</p>
            <p>${name} leans back in the creaking chair, a cigarette slowly burning down to ${pronounPossessive} fingers. Once 
            a detective with a badge and purpose, now a private investigator scraping through the fog and filth of post-war 
            London. Most jobs are petty and thankless, most clients are liars. But every now and then, something comes along 
            that feels... off-script.</p>
            <p>There's a knock on the door.</p>
        `,
        choices: [
            {text: `"Come in."`, next: 'prologueClient'},
            {text: `"I'm busy. Go away."`, next: 'endingRefusal'}
        ]
    },

    prologueClient: {
        background: 'prologue',
        header: `PROLOGUE
            The Missing Brother`,
        text: ({name}) => `
            <p>The door creaks open. In walks a woman dressed too sharp for this part of town. Heels that haven't touched rain, 
            gloves still buttoned at the wrist, a scarf that smells of roses and money. She hesitates at the threshold like 
            she might change her mind. Then, without a word, she crosses the room and stands in front of the desk.</p>
            <p>“You're ${name}, yes?” she says, almost as if confirming a rumour. “My brother Thomas is missing, has been for 
            weeks. A friend said you might be able to help me...”</p>
            <p>Her voice wavers, but her eyes don't. She places a folded photograph of Thomas on the desk, along with five £1 
            banknotes, more than enough to prove she's serious.</p>
        `,
        choices: [
            {text: `“I'll take the case. I don't need the details.”`, next: 'chapterOneStaging'},
            {text: `“Alright. Tell me everything you've got.”`, next: 'prologueDetails'},
            {text: `“Not my problem.”`, next: 'endingRefusal'}
        ]
    },

    prologueDetails: {
        background: 'prologue',
        header: `PROLOGUE
            The Missing Brother`,
        text: () => `
            <p>Evelyn sighs with relief.</p>
            <p>“Thomas hasn't been the same since he came home from the war. About a month ago, he mentioned that he'd signed 
            up for some trial, he said it would fix everything. Then I stopped seeing him altogether. He has a flat on Reardon 
            Street, in Wapping. He gave me a spare key, you can have it. He also mentioned a pub, The Tin Whistle. He would go 
            there often to place bets with some guy. I found this note in one of his coats.”</p>
            <p>She reaches into her coat, producing the key and a creased slip of paper. The ink's faded but the words are 
            still legible.</p>
            <p><em>"IOU £10"</em> signed with the initials <em>"S.R."</em></p>
        `,
        choices: [
            {
                text: `“I'll do what I can to find him. No promises.”`,
                next: 'chapterOneStaging',
                setFlags: {hasFlatKeyItem: true, hasBetslipClue: true}
            },
            {
                text: `“I'll find him. I promise.”`,
                next: 'chapterOneStaging',
                setFlags: {hasFlatKeyItem: true, hasBetslipClue: true}
            }
        ]
    },

    endingRefusal: {
        background: 'prologue',
        header: 'Game Over',
        text: () => `
            <p>You turn down the case. Maybe someone else will help, maybe not. Either way, this story ends here.</p>
            <p><strong>A disappointing end.</strong></p>
        `,
        choices: [
            {
                text: `Back to Main Menu`,
                action: () => {
                    resetGameData();
                    window.location.href = 'index.html';
                }
            }
        ]
    },

    // Chapter one staging scene
    chapterOneStaging: {
        background: 'chap-one',
        header: `CHAPTER ONE
            The Gang's Grip`,
        text: ({name}) => `
            <p class="text-center"><i class="fa-solid fa-location-dot"></i> WAPPING, LONDON - EARLY AFTERNOON</p>
            <p>The smell of salt and soot hangs heavy in the air. Wapping's narrow streets wind like veins between sagging 
            buildings and shuttered warehouses. The Thames glints dully nearby, more mud than silver, lapping at the piers with 
            tired rhythm. Seagulls circle above, squawking like dockside gossips, while a tugboat groans in the distance.</p>
            <p>${name} walks past rusted railings and half-abandoned shipping yards, where faded signs advertise goods long 
            since looted or forgotten. Men in flat caps lean against brick walls, watching with the quiet suspicion of those 
            who've seen too much.</p>
            <p>This isn't the kind of place that forgets your face.</p>
        `,
        choices: () => [
            ...conditionalChoice(flags.hasFlatKeyItem && !flags.visitedFlat, {
                text: `Search Thomas's Flat`,
                next: 'flatIntro'
            }),
            ...conditionalChoice(!flags.visitedDock, {
                text: `Investigate the Execution Dock`,
                next: 'dockIntro'
            }),
            ...conditionalChoice(!flags.visitedPub, {
                text: `Visit The Tin Whistle pub`,
                next: 'tinWhistleIntro'
            }),
            {
                text: `Continue to Chapter 2 <i class="fa-solid fa-rotate-left fa-spin fa-spin-reverse"></i>`,
                next: 'chapterTwoStaging'
            }
        ]
    },

    // Thomas's Flat scene
    flatIntro: {
        background: 'flat',
        header: `CHAPTER ONE
            Thomas's Flat`,
        text: ({name}) => conditionalText(
            flags.flatDeskSearched || flags.flatWardrobeSearched || flags.flatKitchenSearched || flags.flatFloorboardSearched,
                `
                    <p>${name} wonders if there's more to find or if continuing the search is a waste of time.</p>
                `,
                `
                    <p>The flat is tucked into the top floor of a crumbling tenement in Wapping. The hallway stinks of mildew and coal 
                    smoke. A rusted lock gives way with Evelyn's key, and the door groans open into a dimly lit space.</p>
                    <p>A single bulb swings gently above a room in disarray, the signs of a man who left in a hurry. Clothes 
                    half-folded, papers scattered, ashtrays full. On the desk sits a cracked radio tuned to static, and the window is 
                    slightly ajar, letting in the sound of seagulls and distant sirens.</p>
                    <p>${name} steps inside. Dust motes drift through the beam of light spilling from the window. Time to look for 
                    anything Thomas left behind.</p>
                `),
        choices: () => [
            ...conditionalChoice(!flags.flatDeskSearched, {
                text: `Search the desk drawers`,
                next: 'flatDeskSearch'
            }),
            ...conditionalChoice(!flags.flatWardrobeSearched, {
                text: `Check the wardrobe and coat pockets`,
                next: 'flatWardrobeSearch'
            }),
            ...conditionalChoice(!flags.flatKitchenSearched, {
                text: `Search the kitchen cupboards and bin`,
                next: 'flatKitchenSearch'
            }),
            ...conditionalChoice(!flags.flatFloorboardSearched, {
                text: `Lift the rug and check under the floorboards`,
                next: 'flatFloorboardSearch'
            }),
            {
                text: `Leave the flat <i class="fa-solid fa-rotate-left fa-spin fa-spin-reverse"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedFlat: true}
            }
        ]
    },

    flatDeskSearch: {
        background: 'flat',
        header: `CHAPTER ONE
            Thomas's Flat`,
        text: () => `
            <p>Among the mess of stationary, papers and cigarettes is a stack of banknotes to the sum of £15, could be 
            useful.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'flatIntro',
                setFlags: {hasBankNotesItem: true, flatDeskSearched: true},
            },
            {
                text: `Leave the flat <i class="fa-solid fa-rotate-left fa-spin fa-spin-reverse"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasBankNotesItem: true, visitedFlat: true}
            }
        ]
    },

    flatWardrobeSearch: {
        background: 'flat',
        header: `CHAPTER ONE
            Thomas's Flat`,
        text: () => `
            <p>Old war medals, a shaving kit, and a worn notebook, but the pages are ripped out. Whatever was in there is gone 
            now.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'flatIntro',
                setFlags: {flatWardrobeSearched: true},
            },
            {
                text: `Leave the flat <i class="fa-solid fa-rotate-left fa-spin fa-spin-reverse"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedFlat: true}
            }
        ]
    },

    flatKitchenSearch: {
        background: 'flat',
        header: `CHAPTER ONE
            Thomas's Flat`,
        text: () => `
            <p>Nothing but moulding bread and a broken mug. Wasted time.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'flatIntro',
                setFlags: {flatKitchenSearched: true},
            },
            {
                text: `Leave the flat <i class="fa-solid fa-rotate-left fa-spin fa-spin-reverse"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedFlat: true}
            }
        ]
    },

    flatFloorboardSearch: {
        background: 'flat',
        header: `CHAPTER ONE
            Thomas's Flat`,
        text: () => `
            <p>Hidden beneath a loose board is a folded letter that reads,</p>
            <p>"The grab at the pub outside smooth, no one saw anything. One of them started panicking, but the sedative 
            worked fast. We'll wait for the doc to reach out with who to get next."</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'flatIntro',
                setFlags: {hasEvidence1: true, flatFloorboardSearched: true},
            },
            {
                text: `Leave the flat <i class="fa-solid fa-rotate-left fa-spin fa-spin-reverse"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasEvidence1: true, visitedFlat: true}
            }
        ]
    },
};
