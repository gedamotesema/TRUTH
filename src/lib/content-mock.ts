import { Act } from '../types/content';

export const ACT_I: Act = {
    id: 'act-1',
    title: 'The Island',
    order: 1,
    description: 'A journey of isolation and the inciting dream.',
    chapters: [
        {
            id: 'chapter-1',
            title: 'Isolation',
            order: 1,
            slug: 'isolation',
            steps: [
                {
                    id: 'step-1-1',
                    type: 'narrative',
                    content: 'I have lived on this island for as long as I can remember. The tides are my clock, and the stars are my map.',
                    visuals: { background: 'island-night' }
                },
                {
                    id: 'step-1-2',
                    type: 'narrative',
                    content: 'I value logic above all. If a thing is, it is. If it is not, it cannot be. My world is consistent.',
                },
                {
                    id: 'step-1-3',
                    type: 'narrative',
                    content: 'Everything has a cause. Everything has an order. This I know, and this I trust.',
                }
            ]
        },
        {
            id: 'chapter-2',
            title: 'The Dream',
            order: 2,
            slug: 'the-dream',
            steps: [
                {
                    id: 'step-2-1',
                    type: 'narrative',
                    content: 'One night, the order was broken.',
                },
                {
                    id: 'step-2-2',
                    type: 'dialogue',
                    speaker: 'The Voice',
                    content: 'Find Me. Find My Church.',
                    visuals: { effect: 'white-flash', background: 'dream-void' }
                },
                {
                    id: 'step-2-3',
                    type: 'narrative',
                    content: 'I woke up to a silence I had never heard before. The question had been planted.',
                }
            ]
        }
    ]
};

export const ACT_II: Act = {
    id: 'act-2',
    title: 'Entering Civilization',
    order: 2,
    description: 'The protagonist enters the world and encounters the problem of diversity in belief.',
    chapters: [
        {
            id: 'chapter-3',
            title: 'Encountering Christianity',
            order: 1,
            slug: 'encountering-christianity',
            steps: [
                {
                    id: 'step-3-1',
                    type: 'narrative',
                    content: 'I left the island. The world is louder than I imagined. More complex. More contradictory.',
                    visuals: { background: 'city-mist' }
                },
                {
                    id: 'step-3-2',
                    type: 'narrative',
                    content: 'I found many who speak of the One from my dream. But they do not speak with one voice.',
                },
                {
                    id: 'step-3-3',
                    type: 'logic',
                    content: 'Logical Axiom: Truth cannot contradict itself. If two groups claim to have the truth but teach opposite things, at least one is wrong.',
                },
                {
                    id: 'step-3-4',
                    type: 'narrative',
                    content: 'The problem is not the existence of Christ. The problem is the division of those who follow Him.',
                },
                {
                    id: 'step-3-5',
                    type: 'reflection',
                    content: 'Choose Your Focus',
                    reflection: {
                        question: 'Where should your investigation begin?',
                        options: [
                            {
                                label: 'The Great Fracture',
                                text: 'The 16th century changed everything. Let us look at the Reformation.',
                                jumpTo: 'step-4-1'
                            },
                            {
                                label: 'The Ancient Claim',
                                text: 'Before the fractures, there was a single body. We must examine Rome.',
                                jumpTo: 'step-11-1'
                            }
                        ]
                    }
                }
            ]
        }
    ]
};

export const ACT_III: Act = {
    id: 'act-3',
    title: 'The Reformation (1517)',
    order: 3,
    description: 'A deep dive into the origins of the split: Luther, Calvin, and Zwingli.',
    chapters: [
        {
            id: 'chapter-4',
            title: 'The Spark',
            order: 1,
            slug: 'luther',
            steps: [
                {
                    id: 'step-4-1',
                    type: 'narrative',
                    content: 'I went to the root of the fracture. Wittenberg, 1517. A monk named Martin Luther.',
                    visuals: { background: 'ancient-library' }
                },
                {
                    id: 'step-4-2',
                    type: 'analysis',
                    content: 'The 95 Theses',
                    analysis: {
                        premise1: 'The Church was selling indulgences (remission of temporal punishment) for money.',
                        premise2: 'Luther argued that salvation is by Faith alone, not bought by coin.',
                        conclusion: 'The necessary correction of abuse morphed into a rejection of Authority.',
                        analysis: 'Luther burned the Papal Bull. He replaced the Pope with the Bible. But who interprets the Bible?'
                    }
                },
                {
                    id: 'step-4-3',
                    type: 'narrative',
                    content: 'Luther thought "Sola Scriptura" (Scripture Alone) would unite the Church. He was wrong.',
                }
            ]
        },
        {
            id: 'chapter-5',
            title: 'The Marburg Colloquy (1529)',
            order: 2,
            slug: 'marburg',
            steps: [
                {
                    id: 'step-5-1',
                    type: 'narrative',
                    content: 'Just 12 years later, the two Giants of the Reformation met. Luther vs. Zwingli. They agreed on everything... except one thing.',
                },
                {
                    id: 'step-5-2',
                    type: 'debate',
                    content: 'Debate: "Hoc Est Corpus Meum"',
                    debate: {
                        sideA: {
                            name: 'Martin Luther',
                            argument: 'Christ said "This IS my body." Not "represents". I stand by the text. The Real Presence remains, even if the bread remains (Consubstantiation).'
                        },
                        sideB: {
                            name: 'Ulrich Zwingli',
                            argument: '"The flesh profits nothing." It is a metaphor. A memorial. To eat flesh is cannibalism. Rationality demands it be a symbol.'
                        },
                        summary: 'The Split. Luther refused Zwingli\'s hand, saying: "You have a different spirit than we." Sola Scriptura failed to unify them on the central act of worship.'
                    }
                },
                {
                    id: 'step-5-3',
                    type: 'quote',
                    content: 'Quote from Luther',
                    quote: {
                        text: "There are as many sects and beliefs as there are heads... One man is a doctor of the Scriptures, forsooth, because he has his own revelations.",
                        author: "Martin Luther",
                        year: "1525 AD",
                        source: "Letter to Christians via Antwerp"
                    }
                }
            ]
        },
        {
            id: 'chapter-6',
            title: 'The System (Calvinism)',
            order: 3,
            slug: 'calvin',
            steps: [
                {
                    id: 'step-6-1',
                    type: 'narrative',
                    content: 'Then came the Lawyer of the Reformation. John Calvin. He systematized the revolt into T.U.L.I.P.',
                },
                {
                    id: 'step-6-2',
                    type: 'analysis',
                    content: 'Analyzing Double Predestination',
                    analysis: {
                        premise1: 'God is absolutely Sovereign. Nothing happens without His Will.',
                        premise2: 'Therefore, God actively chooses some for Heaven (Election) and others for Hell (Reprobation) before they are born.',
                        conclusion: 'Free Will is an illusion. Salvation is irresistible for the Elect and impossible for the Damned.',
                        analysis: 'This "monergism" turns God into the author of evil. The Ancient Church taught "Synergy" - God works, and man cooperates.'
                    }
                },
                {
                    id: 'step-6-3',
                    type: 'narrative',
                    content: 'This cold logic fueled the Puritan work ethic, but stripped the world of beauty (Iconoclasm). Altars were smashed. Statues beheaded.',
                }
            ]
        }
    ]
};

export const ACT_IV: Act = {
    id: 'act-4',
    title: 'The Fragmentation',
    order: 4,
    description: 'The children of the Reformation: The Denominational Maze.',
    chapters: [
        {
            id: 'chapter-7',
            title: 'The Evangelicals',
            order: 1,
            slug: 'evangelicals',
            steps: [
                {
                    id: 'step-7-1',
                    type: 'narrative',
                    content: 'Centuries later. The "Relationship over Religion" movement. A child of Zwingli\'s memorialism and Calvin\'s individualism.',
                    visuals: { background: 'ancient-library' }
                },
                {
                    id: 'step-7-2',
                    type: 'debate',
                    content: 'Debate: Spirit vs Structure',
                    debate: {
                        sideA: {
                            name: 'Evangelical',
                            argument: 'God is Spirit. Liturgy and rituals are dead works. We need the Holy Spirit, speaking in tongues, and direct revelation for today.'
                        },
                        sideB: {
                            name: 'Biblical Order',
                            argument: 'God is not the author of confusion (1 Cor 14:33). If every person has their own private revelation, who judges the truth? Subjectivism leads to chaos.'
                        },
                        summary: 'Without the Church to test the spirits, "Personal Revelation" has fractured Protestantism into 40,000 distinct groups.'
                    }
                }
            ]
        },
        {
            id: 'chapter-8',
            title: 'The Baptists',
            order: 2,
            slug: 'baptists',
            steps: [
                {
                    id: 'step-8-1',
                    type: 'narrative',
                    content: 'The Baptists. Radicalizing Zwingli\'s view that sacraments are just symbols.',
                },
                {
                    id: 'step-8-2',
                    type: 'debate',
                    content: 'Debate: Symbol vs Sacrament',
                    debate: {
                        sideA: {
                            name: 'Baptist View',
                            argument: 'Baptism is just an outward sign of an inward grace. It does not save. It is for those who are old enough to believe.'
                        },
                        sideB: {
                            name: 'Scripture & History',
                            argument: 'The Bible says "Baptism NOW saves you" (1 Peter 3:21). It replaces Circumcision (Col 2:11), which was for infants. To deny it to children is to deny them the Covenant.'
                        },
                        summary: 'The Early Church universally baptized infants. To argue otherwise is to claim the Church fell into error immediately after the Apostles.'
                    }
                },
                {
                    id: 'step-8-3',
                    type: 'quote',
                    content: 'Quote from St. Cyprian',
                    quote: {
                        text: "As to the case of infants: if even to the most grievous offenders forgiveness is granted... how much more should an infant not be forbidden?",
                        author: "St. Cyprian of Carthage",
                        year: "250 AD",
                        title: "Epistle 58"
                    }
                }
            ]
        },
        {
            id: 'chapter-9',
            title: 'The Methodists & Holiness',
            order: 3,
            slug: 'methodists',
            steps: [
                {
                    id: 'step-9-1',
                    type: 'narrative',
                    content: 'The Methodists tried to solve the "Faith Alone" problem by adding "Striving for Perfection".',
                },
                {
                    id: 'step-9-2',
                    type: 'analysis',
                    content: 'Analyzing Sola Fide',
                    analysis: {
                        premise1: 'The phrase "Faith Alone" appears only once in the Bible (James 2:24).',
                        premise2: 'The verse says: "You see that a person is justified by works and NOT by faith alone."',
                        conclusion: 'The foundational doctrine of the Reformation contradicts the explicit text of Scripture.',
                        analysis: 'The Fathers taught Theosis - becoming like God through grace and cooperation. Faith is not just a legal transaction.'
                    }
                }
            ]
        },
        {
            id: 'chapter-10',
            title: 'The Adventists & Mormons',
            order: 4,
            slug: 'restorationists',
            steps: [
                {
                    id: 'step-10-1',
                    type: 'narrative',
                    content: 'Then came the Restorationists. Adventists saying the day was wrong. Mormons saying the whole Church died.',
                },
                {
                    id: 'step-10-2',
                    type: 'analysis',
                    content: 'Analyzing The Great Apostasy',
                    analysis: {
                        premise1: 'Christ promised: "I will build my church, and the gates of hell shall not prevail against it" (Matt 16:18).',
                        premise2: 'Mormonism/Restorationism claims the gates of hell DID prevail, and the Church vanished for 1800 years.',
                        conclusion: 'Therefore, either Mormonism is false, or Christ is a liar.',
                        analysis: 'A restored Church implies a failed God. The True Church must be continuous, organic, and historical.'
                    }
                },
                {
                    id: 'step-10-3',
                    type: 'quote',
                    content: 'Quote from Cardinal Newman',
                    quote: {
                        text: "To be deep in history is to cease to be a Protestant.",
                        author: "John Henry Newman",
                        year: "1845 AD",
                        title: "Essay on Doctrine"
                    }
                }
            ]
        }
    ]
};

export const ACT_V: Act = {
    id: 'act-5',
    title: 'The Roman Claim',
    order: 5,
    description: 'Investigating the Catholic Church.',
    chapters: [
        {
            id: 'chapter-11',
            title: 'The City on Seven Hills',
            order: 1,
            slug: 'rome',
            steps: [
                {
                    id: 'step-11-1',
                    type: 'narrative',
                    content: 'I crossed the sea to Rome. Here, the history is visible. Unbroken succession.',
                    visuals: { background: 'cathedral-interior' }
                },
                {
                    id: 'step-11-2',
                    type: 'debate',
                    content: 'Number One vs First Among Equals',
                    debate: {
                        sideA: {
                            name: 'Papal Supremacy',
                            argument: 'Peter is the Rock. The Pope is the successor of Peter and holds the Keys of the Kingdom. He has universal jurisdiction.'
                        },
                        sideB: {
                            name: 'Conciliarity',
                            argument: 'Peter was one of twelve. The Keys were given to all the Apostles (Matt 18:18). The early Church solved problems in Councils, not by a single Bishop.'
                        },
                        winner: 'B',
                        summary: 'Impact: If one Bishop has absolute power, the Church becomes a monarchy. But history shows the East never accepted Rome as absolute ruler.'
                    }
                },
                {
                    id: 'step-11-3',
                    type: 'quote',
                    content: 'Quote from St. Cyprian',
                    quote: {
                        text: "The Episcopate is one, each part of which is held by each one for the whole... certainly the other Apostles were also what Peter was.",
                        author: "St. Cyprian of Carthage",
                        year: "250 AD",
                        title: "Martyr & Bishop",
                        source: "On the Unity of the Church"
                    }
                }
            ]
        }
    ]
};

export const ACT_VI: Act = {
    id: 'act-6',
    title: 'The Fork in the Road',
    order: 6,
    description: 'The Council of Chalcedon.',
    chapters: [
        {
            id: 'chapter-12',
            title: '451 AD',
            order: 1,
            slug: 'chalcedon',
            steps: [
                {
                    id: 'step-12-1',
                    type: 'narrative',
                    content: 'I went back further. To the year 451 AD. The schism over the Nature of Christ.',
                    visuals: { background: 'council-hall' }
                },
                {
                    id: 'step-12-2',
                    type: 'debate',
                    content: 'The Definition of Faith',
                    debate: {
                        sideA: {
                            name: 'Chalcedonian Definition',
                            argument: 'Christ is made known IN two natures. Divine and Human. Unconfused, unchangeable, indivisible, inseparable.'
                        },
                        sideB: {
                            name: 'St. Cyril\'s Formula',
                            argument: 'If you say "Two Natures" actualized after the union, you imply two centers of operation. We must say "One Incarnate Nature of God the Word".'
                        },
                        summary: 'The Council of Chalcedon adopted the language of "Two Natures" which sounded like division to the Oriental Fathers who guarded the unity of Christ.'
                    }
                },
                {
                    id: 'step-12-3',
                    type: 'quote',
                    content: 'Quote from St. Cyril',
                    quote: {
                        text: "We do not say that there are two natures, but one incarnate nature of God the Word.",
                        author: "St. Cyril of Alexandria",
                        title: "Pillar of Faith",
                        year: "430 AD",
                        source: "Letter to Succensus"
                    }
                }
            ]
        }
    ]
};

export const ACT_VII: Act = {
    id: 'act-7',
    title: 'The Pearl',
    order: 7,
    description: 'Finding the Oriental Orthodox Church.',
    chapters: [
        {
            id: 'chapter-13',
            title: 'The Hidden Treasure',
            order: 1,
            slug: 'oriental-orthodoxy',
            steps: [
                {
                    id: 'step-13-1',
                    type: 'narrative',
                    content: 'I found the family of churches that refused to compromise the Unity of Christ. Coptic, Ethiopian, Syriac, Armenian, Indian, Eritrean.',
                    visuals: { background: 'coptic-icon' }
                },
                {
                    id: 'step-13-2',
                    type: 'revelation',
                    content: 'They are the Oriental Orthodox.',
                    visuals: { effect: 'gold-glow' }
                },
                {
                    id: 'step-13-3',
                    type: 'scripture',
                    content: 'Stand at the crossroads and look; ask for the ancient paths, ask where the good way is, and walk in it, and you will find rest for your souls.',
                    metadata: { reference: 'Jeremiah 6:16' }
                },
                {
                    id: 'step-13-4',
                    type: 'dialogue',
                    speaker: 'The Voice',
                    content: 'Welcome Home.',
                }
            ]
        }
    ]
};

export const ALL_ACTS = [ACT_I, ACT_II, ACT_III, ACT_IV, ACT_V, ACT_VI, ACT_VII];
