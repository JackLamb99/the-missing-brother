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
            {
                text: `"Come in."`,
                next: 'prologueClient'
            },
            {
                text: `"I'm busy. Go away."`,
                next: 'endingRefusal'
            }
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
            <p>"You're ${name}, yes?" she says, almost as if confirming a rumour. "My brother Thomas is missing, has been for 
            weeks. A friend said you might be able to help me..."</p>
            <p>Her voice wavers, but her eyes don't. She places a folded photograph of Thomas on the desk, along with five £1 
            banknotes, more than enough to prove she's serious.</p>
        `,
        choices: [
            {
                text: `"I'll take the case. I don't need the details."`,
                next: 'chapterOneStaging'
            },
            {
                text: `"Alright. Tell me everything you've got."`,
                next: 'prologueDetails'
            },
            {
                text: `"Not my problem."`,
                next: 'endingRefusal'
            }
        ]
    },

    prologueDetails: {
        background: 'prologue',
        header: `PROLOGUE
            The Missing Brother`,
        text: () => `
            <p>Evelyn sighs with relief.</p>
            <p>"Thomas hasn't been the same since he came home from the war. About a month ago, he mentioned that he'd signed 
            up for some trial, he said it would fix everything. Then I stopped seeing him altogether. He has a flat on Reardon 
            Street, in Wapping. He gave me a spare key, you can have it. He also mentioned a pub, The Tin Whistle. He would go 
            there often to place bets with some guy. I found this note in one of his coats."</p>
            <p>She reaches into her coat, producing the key and a creased slip of paper. The ink's faded but the words are 
            still legible:</p>
            <p><em>"IOU £10"</em> signed with the initials <em>"S.R."</em></p>
        `,
        choices: [
            {
                text: `"I'll do what I can to find him. No promises."`,
                next: 'chapterOneStaging',
                setFlags: {hasFlatKeyItem: true, hasBetslipClue: true}
            },
            {
                text: `"I'll find him. I promise."`,
                next: 'chapterOneStaging',
                setFlags: {hasFlatKeyItem: true, hasBetslipClue: true}
            }
        ]
    },

    endingRefusal: {
        background: 'prologue',
        header: 'GAME OVER!',
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
                text: `Continue to Chapter 2 <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterTwoStaging'
            }
        ]
    },

    // Thomas's Flat scenes
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
                    <p>The flat is tucked into the top floor of a crumbling tenement in Wapping. The hallway stinks of mildew 
                    and coal smoke. A rusted lock gives way with Evelyn's key, and the door groans open into a dimly lit 
                    space.</p>
                    <p>A single bulb swings gently above a room in disarray, the signs of a man who left in a hurry. Clothes 
                    half-folded, papers scattered, ashtrays full. On the desk sits a cracked radio tuned to static, and the 
                    window is slightly ajar, letting in the sound of seagulls and distant sirens.</p>
                    <p>${name} steps inside. Dust motes drift through the beam of light spilling from the window. Time to look 
                    for anything Thomas left behind.</p>
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
                text: `Leave the flat <i class="fa-solid fa-rotate-left no-return"></i>`,
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
                text: `Leave the flat <i class="fa-solid fa-rotate-left no-return"></i>`,
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
                text: `Leave the flat <i class="fa-solid fa-rotate-left no-return"></i>`,
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
                text: `Leave the flat <i class="fa-solid fa-rotate-left no-return"></i>`,
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
            <p>Hidden beneath a loose board is a folded letter that reads:</p>
            <p><em>"The grab at the pub outside smooth, no one saw anything. One of them started panicking, but the sedative 
            worked fast. We'll wait for the doc to reach out with who to get next."</em></p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'flatIntro',
                setFlags: {hasEvidence1: true, flatFloorboardSearched: true},
            },
            {
                text: `Leave the flat <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasEvidence1: true, visitedFlat: true}
            }
        ]
    },

    // Execution Dock scenes
    dockIntro: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => conditionalText(
            flags.dockMotorboatSearched || flags.dockContainerSearched || flags.dockPalletsSearched || flags.dockTugboatSearched,
                `
                    <p>${name} wonders if there's more to find or if continuing the search is a waste of time.</p>
                `,
                `
                    <p>The water at Execution Dock is slick with oil and secrets. Once the site of public hangings for pirates 
                    and smugglers, it's now a crumbling husk of rusted cranes, abandoned barges, and splintered decking. The 
                    fog rolls thick along the Thames, blurring the line between the river and the underworld.</p>
                    <p>${name} steps quietly onto the dock, boots creaking on old wood. Somewhere below, water laps against 
                    concrete. A seagull cries overhead, then nothing, just silence and the faint scent of diesel, blood, and 
                    rope.</p>
                    <p>This place isn't abandoned. Not really.</p>
                `),
        choices: () => [
            ...conditionalChoice(!flags.dockMotorboatSearched, {
                text: `Inspect the burned-out motorboat`,
                next: 'dockMotorboatSearch'
            }),
            ...conditionalChoice(!flags.dockContainerSearched, {
                text: `Check the old shipping container near the crane`,
                next: 'dockContainerSearch'
            }),
            ...conditionalChoice(!flags.dockPalletsSearched, {
                text: `Search behind the stacked pallets by the warehouse wall`,
                next: 'dockPalletsSearch'
            }),
            ...conditionalChoice(!flags.dockTugboatSearched, {
                text: `Board the abandoned tugboat`,
                next: 'dockTugboatSearch'
            }),
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedDock: true}
            }
        ]
    },

    dockMotorboatSearch: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p>The vessel is half-sunken, charred black by fire, long abandoned. ${name} climbs aboard and finds only rusted 
            tools, soggy rope, and the faint stink of petrol.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {dockMotorboatSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedDock: true}
            }
        ]
    },

    dockContainerSearch: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p>${name} pries open the rusted door and searches inside. Beneath a moulding tarp are crates marked:</p>
            <p><em>"MED EQUIP - HANDLE WITH CARE"</em></p>
            <p>Opening one reveals a box of syringes and black vials labelled only with a string of numbers and the letters 
            'TP-4C'. A torn document nearby reads:</p>
            <p><em>"To be used on candidates flagged via psychological markers only. Do not administer without handler 
            presence."</em></p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {hasEvidence2: true, dockContainerSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasEvidence2: true, visitedDock: true}
            }
        ]
    },

    dockPalletsSearch: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p>A cat darts out as ${name} steps close, knocking over a loose pile of wood. Nothing to see but old cigarette 
            cartons and bottle caps.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {dockPalletsSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedDock: true}
            }
        ]
    },

    dockTugboatSearch: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p>${name} creeps up the gangplank toward the rust-covered vessel. Inside, crates and broken benches litter the 
            deck, but there's movement in the shadows. The back of a burly figure wearing a long trench coat and flat cap is 
            silhouetted in the dimly lit boat by the cigarette in his mouth.</p>
        `,
        choices: [
            {
                text: `Quietly walk away <i class="fa-solid fa-rotate-left can-return"></i>`,
                next: 'dockIntro',
            },
            {
                text: `Charge the man <em>(Success: 4/12)</em> <i class="fa-solid fa-dice low-risk"></i>`,
                action: () => rollDiceCheck(4, 'dockChargeSuccess', 'dockChargeFail')
            },
            {
                text: `Sneak up behind him <em>(Success: 8/12)</em> <i class="fa-solid fa-dice high-risk"></i>`,
                action: () => rollDiceCheck(8, 'dockSneakSuccess', 'dockSneakFail')
            }
        ]
    },

    dockChargeSuccess: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p><em>Dice roll successful!</em></p>
            <p>The man turns at the sudden sound of footsteps, crowbar in hand, but ${name} closes the distance fast and 
            tackles him at a run. He hits the ground with a loud thud, knocking him out cold.</p>
            <p>A folded switch-blade falls from his pocket onto the floor beside him.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {hasKnifeItem: true, dockTugboatSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasKnifeItem: true, visitedDock: true}
            }
        ]
    },

    dockChargeFail: {
        background: 'dock',
        header: `GAME OVER!`,
        text: ({name, pronounReflexive}) => `
            <p><em>Dice roll failed.</em></p>
            <p>The man turns at the sudden sound of footsteps as ${name} stumbles on a loose floorboard and runs head first 
            into an exposed pipe, knocking ${pronounReflexive} out cold.</p>
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

    dockSneakSuccess: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p><em>Dice roll successful!</em></p>
            <p>${name} sneaks up behind the man and wraps him up in a tight choke-hold. He slumps to the ground, passed out.</p>
            <p>A folded switch-blade falls from his pocket onto the floor beside him.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {hasKnifeItem: true, dockTugboatSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasKnifeItem: true, visitedDock: true}
            }
        ]
    },

    dockSneakFail: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p><em>Dice roll failed.</em></p>
            <p>The floorboard creaks. The man spins, crowbar in hand, aiming for ${name}'s head.</p>
        `,
        choices: [
            {
                text: `Flee <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedDock: true}
            },
            {
                text: `Duck and tackle him <em>(Success: 4/12)</em> <i class="fa-solid fa-dice low-risk"></i>`,
                action: () => rollDiceCheck(4, 'dockDuckSuccess', 'dockDuckFail')
            },
            {
                text: `Block and disarm him <em>(Success: 8/12)</em> <i class="fa-solid fa-dice high-risk"></i>`,
                action: () => rollDiceCheck(8, 'dockBlockSuccess', 'dockBlockFail')
            }
        ]
    },

    dockDuckSuccess: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p><em>Dice roll successful!</em></p>
            <p>${name} ducks under the crowbar and tackles the man at a run. He hits the ground with a loud thud, knocking him 
            out cold.</p>
            <p>A folded switch-blade falls from his pocket onto the floor beside him.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {hasKnifeItem: true, dockTugboatSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasKnifeItem: true, visitedDock: true}
            }
        ]
    },

    dockDuckFail: {
        background: 'dock',
        header: `GAME OVER!`,
        text: ({name, pronounObject}) => `
            <p><em>Dice roll failed.</em></p>
            <p>The crowbar slams hard into ${name}'s head, knocking ${pronounObject} out cold.</p>
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

    dockBlockSuccess: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p><em>Dice roll successful!</em></p>
            <p>${name} blocks the crowbar before it picks up momentum, rips it from the mans grasp and swings it back at him. 
            He hits the ground with a loud thud, knocking him out cold.</p>
            <p>A folded switch-blade falls from his pocket onto the floor beside him.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {hasKnifeItem: true, dockTugboatSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasKnifeItem: true, visitedDock: true}
            }
        ]
    },

    dockBlockFail: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p><em>Dice roll failed.</em></p>
            <p>${name} blocks the crowbar before it picks up momentum, but the man keeps hold of it, bringing it back for 
            another swing.</p>
        `,
        choices: [
            {
                text: `Flee <em>(Success: 4/12)</em> <i class="fa-solid fa-dice low-risk"></i>`,
                action: () => rollDiceCheck(4, 'dockFleeSuccess', 'dockFleeFail')
            },
            {
                text: `Headbutt him <em>(Success: 8/12)</em> <i class="fa-solid fa-dice high-risk"></i>`,
                action: () => rollDiceCheck(8, 'dockHeadbuttSuccess', 'dockHeadbuttFail')
            }
        ]
    },

    dockHeadbuttSuccess: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name}) => `
            <p><em>Dice roll successful!</em></p>
            <p>Before the man can swing again, ${name} headbutts him hard on the nose. He stumbles back, trips on a loose 
            floorboard and hits the ground with a loud thud, knocking himself out cold.</p>
            <p>A folded switch-blade falls from his pocket onto the floor beside him.</p>
        `,
        choices: [
            {
                text: `Continue search`,
                next: 'dockIntro',
                setFlags: {hasKnifeItem: true, dockTugboatSearched: true},
            },
            {
                text: `Leave the dock <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasKnifeItem: true, visitedDock: true}
            }
        ]
    },

    dockHeadbuttFail: {
        background: 'dock',
        header: `GAME OVER!`,
        text: ({name, pronounPossessive, pronounObject}) => `
            <p><em>Dice roll failed.</em></p>
            <p>The man is quicker with this swing and before ${name} has a chance to react, the crowbar slams hard into 
            ${pronounPossessive} head, knocking ${pronounObject} out cold. </p>
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

    dockFleeSuccess: {
        background: 'dock',
        header: `CHAPTER ONE
            The Execution Dock`,
        text: ({name, pronounSubject}) => `
            <p>${name} turns and flees, running as hard as ${pronounSubject} can until the dock disappears into the horizon.</p>
        `,
        choices: [
            {
                text: `Continue`,
                next: 'chapterOneStaging',
                setFlags: {visitedDock: true}
            }
        ]
    },

    dockFleeFail: {
        background: 'dock',
        header: `GAME OVER!`,
        text: ({name, pronounPossessive, pronounObject}) => `
            <p><em>Dice roll failed</em></p>
            <p>${name} turns to flee, but the man is too fast. The crowbar slams hard into the back of ${pronounPossessive} 
            head, knocking ${pronounObject} out cold.</p>
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
    }
};