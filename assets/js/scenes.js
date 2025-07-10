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
            <p>Her voice wavers, but her eyes don't. She places a photograph of Thomas on the desk.</p>
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
            ...conditionalChoice(!flags.visitedPub && !flags.pubCanReturn, {
                text: `Visit The Tin Whistle pub`,
                next: 'pubIntro'
            }),
            ...conditionalChoice(!flags.visitedPub && flags.pubCanReturn, {
                text: `Return to The Tin Whistle pub`,
                next: 'pubReturnToRowley'
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
                <p>The flat is tucked into the top floor of a crumbling tenement in Wapping. The hallway stinks of mildew and 
                coal smoke. A rusted lock gives way with Evelyn's key, and the door groans open into a dimly lit space.</p>
                <p>A single bulb swings gently above a room in disarray, the signs of a man who left in a hurry. Clothes 
                half-folded, papers scattered, ashtrays full. On the desk sits a cracked radio tuned to static, and the 
                window is slightly ajar, letting in the sound of seagulls and distant sirens.</p>
                <p>${name} steps inside. Dust motes drift through the beam of light spilling from the window. Time to look 
                for anything Thomas left behind.</p>
            `
        ),
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
                and smugglers, it's now a crumbling husk of rusted cranes, abandoned barges, and splintered decking. The fog 
                rolls thick along the Thames, blurring the line between the river and the underworld.</p>
                <p>${name} steps quietly onto the dock, boots creaking on old wood. Somewhere below, water laps against 
                concrete. A seagull cries overhead, then nothing, just silence and the faint scent of diesel, blood, and 
                rope.</p>
                <p>This place isn't abandoned. Not really.</p>
            `
        ),
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
    },

    // The Tin Whistle scenes
    pubIntro: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: ({name}) => `
            <p>The Tin Whistle doesn't look like much from the outside, just another soot-stained pub tucked between a 
            butcher's and a boarded-up bakery. But inside, the walls sweat nicotine and the lighting turns everything a shade 
            of yellow. A broken jukebox hums low from the corner, playing a warbled tune. Old men nurse a beer, heads down. 
            Younger ones size up the newcomers. Behind the bar, a wiry barman with sleeves rolled up wipes glasses like they 
            owe him money.</p>
            <p>${name} steps in and approaches the bar, shaking off the drizzle. The stink of spilt beer and fried meat hits 
            hard. This is the sort of place where secrets sit in stained upholstery and eye contact is a challenge.</p>
        `,
        choices: () => [
            {
                text: `"I'm looking for someone who knows things. Quiet things."`,
                next: 'pubBarman'
            },
            {
                text: `"You get many nervous types drinking alone here?"`,
                next: 'pubBarman'
            },
            {
                text: `"Any of your regulars act like they've got something to hide?"`,
                next: 'pubBarman'
            },
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedPub: true}
            }
        ]
    },

    pubBarman: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: () => `
            <p>The barkeep leans close and replies:</p>
            <p>"You didn't hear it from me, but there's three over there who drink regular and keep their mouths shut. Ask the 
            right one, you might learn something. Their names are..."</p>
        `,
        choices: [
            {
                text: `"Jimmy Haynes"`,
                next: 'pubChoiceHaynes',
            },
            {
                text: `"Sean Rowley"`,
                next: 'pubChoiceRowley',
            },
            {
                text: `"Colin Ward"`,
                next: 'pubChoiceWard',
            },
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedPub: true}
            }
        ]
    },

    pubChoiceHaynes: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: ({name}) => `
            <p>${name} sits down with Haynes and says:</p>
            <p>"I've got a couple questions for you, about a friend named Thomas Blackwood."</p>
            <p>Haynes looks up from his beer with a dismissive look on his face and replies:</p>
            <p>"Never heard of him, and this isn't the place to be asking too many questions"</p>
            <p><em>This is your second chance, you won't get a third...</em></p>
        `,
        choices: [
            {
                text: `Talk to Sean Rowley`,
                next: 'pubChoiceRowley',
            },
            {
                text: `Talk to Colin Ward`,
                next: 'pubSecondChoiceWard',
            },
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedPub: true}
            }
        ]
    },

    pubChoiceWard: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: ({name}) => `
            <p>${name} sits down with Ward and says:</p>
            <p>"I've got a couple questions for you, about a friend named Thomas Blackwood."</p>
            <p>Ward looks up from his beer with a dismissive look on his face and replies:</p>
            <p>"Never heard of him, and this isn't the place to be asking too many questions"</p>
            <p><em>This is your second chance, you won't get a third...</em></p>
        `,
        choices: [
            {
                text: `Talk to Jimmy Haynes`,
                next: 'pubSecondChoiceHaynes',
            },
            {
                text: `Talk to Sean Rowley`,
                next: 'pubChoiceRowley',
            },
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedPub: true}
            }
        ]
    },

    pubSecondChoiceWard: {
        background: 'pub',
        header: `GAME OVER!`,
        text: ({name}) => `
            <p>${name} sits down with Ward and says again:</p>
            <p>"I've got a couple questions for you, about a friend named Thomas Blackwood."</p>
            <p>Haynes storms over from his table, glass in hand, and slams it into ${name}'s temple, angrily yelling:</p>
            <p>"I already told you this wasn't the place to be asking questions!"</p>
            <p>${name}'s unconcious body is dragged outside and dumped in an alley behind the pub.</p>
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

    pubSecondChoiceHaynes: {
        background: 'pub',
        header: `GAME OVER!`,
        text: ({name}) => `
            <p>${name} sits down with Haynes and says again:</p>
            <p>"I've got a couple questions for you, about a friend named Thomas Blackwood."</p>
            <p>Ward storms over from his table, glass in hand, and slams it into ${name}'s temple, angrily yelling:</p>
            <p>"I already told you this wasn't the place to be asking questions!"</p>
            <p>${name}'s unconcious body is dragged outside and dumped in an alley behind the pub.</p>
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

    pubChoiceRowley: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: ({name}) => `
            <p>${name} sits down with Rowley and says:</p>
            <p>"I've got a couple questions for you, about a friend named Thomas Blackwood"</p>
            <p>The twitchy man looks up from his beer, with a sly whisper he replies:</p>
            <p>"I'm sure I could be convinced to talk, for a price of course"</p>
        `,
        choices: () => [
            ...conditionalChoice(flags.hasBankNotesItem, {
                text: `Bribe him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubBribeSuccess'
            }),
            ...conditionalChoice(!flags.hasBankNotesItem, {
                text: `Bribe him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubBribeFail'
            }),
            ...conditionalChoice(flags.hasKnifeItem, {
                text: `Threaten him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubThreatSuccess'
            }),
            ...conditionalChoice(!flags.hasKnifeItem, {
                text: `Threaten him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubThreatFail'
            }),
            {
                text: `"I'll be back, don't you go anywhere." <i class="fa-solid fa-rotate-left can-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {pubCanReturn: true}
            }
        ]
    },

    pubReturnToRowley: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: ({name}) => `
            <p>${name} sits back down with Rowley as he drains the last dregs of his beer and mutters:</p>
            <p>"I'm still willing to talk, but it's still going to cost you."</p>
        `,
        choices: () => [
            ...conditionalChoice(flags.hasBankNotesItem, {
                text: `Bribe him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubBribeSuccess'
            }),
            ...conditionalChoice(!flags.hasBankNotesItem, {
                text: `Bribe him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubBribeFail'
            }),
            ...conditionalChoice(flags.hasKnifeItem, {
                text: `Threaten him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubThreatSuccess'
            }),
            ...conditionalChoice(!flags.hasKnifeItem, {
                text: `Threaten him <i class="fa-solid fa-screwdriver-wrench"></i>`,
                next: 'pubThreatFail'
            }),
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedPub: true}
            }
        ]
    },

    pubBribeSuccess: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: ({name, pronounSubject}) => `
            <p><em>Bribe successful!</em></p>
            <p>${name} produces the stack of notes ${pronounSubject} found in Thomas's flat and waves it under the wirey man's 
            nose. Rowley pockets cash, leans in close and whispers:</p>
            <p>"Look, I haven't seen Thomas in a while, but I overheard something last week, some lads talking about 'trigger 
            points' or something. No idea what it meant, but I know they weren't talking about a massage. Also, there's this 
            copper, name's Detective Inspector Fallon. He's stationed down in Rotherhithe, but shows up here sometimes, and no 
            one touches him, like he's protected."</p>
        `,
        choices: [
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasOverheardClue: true, hasDetectiveClue: true, visitedPub: true}
            }
        ]
    },

    pubBribeFail: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: () => `
            <p><em>Bribe failed.</em></p>
            <p>Rowley sneers and says:</p>
            <p>"You don't seem to have anything worth my time. I think it's best you don't show your face here again."</p>
        `,
        choices: [
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {visitedPub: true}
            }
        ]
    },

    pubThreatSuccess: {
        background: 'pub',
        header: `CHAPTER ONE
            The Tin Whistle`,
        text: ({name, pronounSubject}) => `
            <p><em>Threat successful!</em></p>
            <p>${name} produces the switch-blade ${pronounSubject} took from the man at the dock and waves it under the wirey 
            man's nose. Rowley's eyes widen in fear as he stutters over his words:</p>
            <p>"Alright alright, no need for all that. I haven't seen Thomas in a while, but I overheard something last week, 
            some lads talking about 'trigger points' or something. No idea what it meant, but I know they weren't talking 
            about a massage. Also, there's a copper, name's Detective Inspector Fallon. He's stationed down in Rotherhithe, 
            but shows up here sometimes, and no one touches him, like he's protected."</p>
        `,
        choices: [
            {
                text: `Leave the pub <i class="fa-solid fa-rotate-left no-return"></i>`,
                next: 'chapterOneStaging',
                setFlags: {hasOverheardClue: true, hasDetectiveClue: true, visitedPub: true}
            }
        ]
    },

    pubThreatFail: {
        background: 'pub',
        header: `GAME OVER!`,
        text: ({name}) => `
            <p><em>Bribe failed.</em></p>
            <p>${name} grabs the collar of Rowley's coat and tries to sound as treatening as possible:</p>
            <p>"Tell me what you know about Thomas Blackwood, or else."</p>
            <p>Rowley narrows his eyes and slams his pint glass into ${name}'s face, growling:</p>
            <p>"You've got a big mouth for someone so empty-handed."</p>
            <p>${name}'s unconcious body is dragged outside and dumped in an alley behind the pub.</p>
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

    chapterTwoStaging: {
        background: 'chap-two',
        header: `CHAPTER TWO
            To Be Continued...`,
        text: ({name}) => `
            <p>Thank you for playing Chapter One of <strong>The Missing Brother</strong>!</p>
            <p>Chapter Two is currently in development, you will be able to continue ${name}'s journey soon.</p>
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