const scenes = {
    // Prologue scenes
    prologue: {
        background: 'prologue',
        header: `PROLOGUE
            The Missing Brother`,
        text: ({name, pronounPossessive}) => `
            <p class="text-center"><i class="fa-solid fa-location-dot"></i> BERMONDSEY, LONDON - LATE MORNING, MARCH, 1949</p>
            <p>The office smells of cigarettes and old paper. A ceiling fan clicks slowly overhead, stirring the smoke around 
            the room as it rises from a heavy glass ashtray. Rain patters against the glass windows in steady  rhythm, pooling 
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
            {text: `“I'll take the case. I don't need the details.”`, next: 'chapter1Start'},
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
            up for some trial — he said it would fix everything. Then I stopped seeing him altogether. He has a flat on 
            Reardon Street, in Wapping. He gave me a spare key — you can have it. He also mentioned a pub, The Tin Whistle. 
            He would go there often to place bets with some guy. I found this note in one of his coats.”</p>
            <p>She reaches into her coat, producing the key and a creased slip of paper. The ink's faded but the words are 
            still legible.</p>
            <p><em>"IOU £10"</em> - signed with the initials <em>"S.R."</em></p>
        `,
        choices: [
            {
                text: `“I'll do what I can to find him. No promises.”`,
                next: 'chapterOneStaging',
                setFlags: { hasFlatKeyItem: true, hasBetslipClue: true }
            },
            {
                text: `“I'll find him. I promise.”`,
                next: 'chapterOneStaging',
                setFlags: { hasFlatKeyItem: true, hasBetslipClue: true }
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
                text: 'Back to Main Menu',
                action: () => {
                    resetGameData();
                    window.location.href = 'index.html';
                }
            }
        ]
    }
};
