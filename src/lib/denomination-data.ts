export interface DenominationSummary {
    id: string;
    name: string;
    creator: string;
    originYear: string;
    isCorrectTeaching?: boolean;
    dogma: string[];
    contradictions: {
        point: string;
        ancientTeaching: string;
        scriptureRef?: string;
    }[];
}

export const DENOMINATION_DATA: DenominationSummary[] = [
    {
        id: 'ancient-church',
        name: 'Oriental Orthodox (The Ancient Church)',
        creator: 'Jesus Christ / The Apostles',
        originYear: '33 AD',
        isCorrectTeaching: true,
        dogma: [
            'Miaphysitism: One united nature of the Incarnate Word (St. Cyril of Alexandria). Completely God and completely Man in one person without confusion or change.',
            'Seven Sacraments: Baptism, Chrismation, Eucharist, Penance, Holy Matrimony, Holy Orders, and Unction are actual means of receiving divine grace, not just symbols.',
            'Apostolic Succession: Continuous chain of ordination from the Apostles to current Bishops/Priests.',
            'Theosis: The goal of Christian life is to become like God by participating in His uncreated energies through grace.',
            'Holy Tradition: Consists of the Bible, Councils, Liturgy, and Church Fathers as a unified safeguard of truth.'
        ],
        contradictions: []
    },
    {
        id: 'lutheranism',
        name: 'Lutheranism',
        creator: 'Martin Luther',
        originYear: '1517 AD',
        dogma: [
            'Sola Scriptura: Rejects Church Tradition and the Magisterium as equal authorities to the Bible.',
            'Sola Fide: Teaches that justification is by "faith alone," separating it from works and the sacramental life.',
            'Sacramental Union: Christ is "in, with, and under" the bread and wine, but the bread remains bread (unlike the Ancient view of Transformation).',
            'Law and Gospel: A strict distinction where the Law only convicts, and the Gospel only comforts.'
        ],
        contradictions: [
            {
                point: 'Faith Alone (Sola Fide)',
                ancientTeaching: 'The Ancient Church teaches Synergy—the cooperation of human free will with divine grace. St. James explicitly states "a man is justified by works and not by faith alone."',
                scriptureRef: 'James 2:24'
            },
            {
                point: 'Transformation of Eucharist',
                ancientTeaching: 'The early Church universally taught that the bread and wine ARE the Body and Blood (Metabole), not just existing alongside the bread. St. Ignatius called it "the medicine of immortality."',
                scriptureRef: 'John 6:53-56'
            },
            {
                point: 'Authority of Tradition',
                ancientTeaching: 'St. Paul commanded believers to "hold to the traditions which you were taught, whether by word or our epistle." Rejection of Tradition leaves the Bible to subjective interpretation.',
                scriptureRef: '2 Thessalonians 2:15'
            }
        ]
    },
    {
        id: 'calvinism',
        name: 'Calvinism (Reformed)',
        creator: 'John Calvin',
        originYear: '1536 AD',
        dogma: [
            'Total Depravity: Man is so fallen he has no free will to choose God.',
            'Limited Atonement: Christ died ONLY for the elect, and not for the whole world.',
            'Irresistible Grace: God forces the elect to be saved regardless of their will.',
            'Double Predestination: God actively chooses before time who will go to Heaven and who will go to Hell.',
            'Iconoclasm: Rejection of all religious imagery (Icons) as idolatry.'
        ],
        contradictions: [
            {
                point: 'God as Author of Evil',
                ancientTeaching: 'By claiming God predestines people to hell and necessitates sin, Calvinism makes God the author of evil. The Ancient Church teaches God "desires all men to be saved."',
                scriptureRef: '1 Timothy 2:4'
            },
            {
                point: 'Limited Atonement',
                ancientTeaching: 'Scripture states Christ is the propitiation for our sins, and "not for ours only but also for the whole world." Calvinism contradicts the universal love of God.',
                scriptureRef: '1 John 2:2'
            },
            {
                point: 'Rejection of Icons',
                ancientTeaching: 'Icons are a confession of the Incarnation. To reject the image of Christ is to reject that He actually became visible man. The 7th Ecumenical Council affirmed their necessity.',
                scriptureRef: 'Colossians 1:15'
            }
        ]
    },
    {
        id: 'baptist',
        name: 'Baptist',
        creator: 'John Smyth / Thomas Helwys',
        originYear: '1609 AD',
        dogma: [
            'Believer\'s Baptism: Rejects the baptism of infants, claiming one must have intellectual faith first.',
            'Memorialism: The bread and wine are strictly symbols. There is no spiritual presence or grace in the Eucharist.',
            'Ordinances not Sacraments: Baptism/Eucharist are just "commands" to obey, not channels of grace.',
            'Individual Priesthood: Every individual is their own highest authority in interpreting the Bible.'
        ],
        contradictions: [
            {
                point: 'Infant Baptism',
                ancientTeaching: 'Baptism is the new circumcision (Col 2:11). Just as infants were in the Old Covenant, they are brought into the New. Rejection ignores the "whole households" baptized in Acts.',
                scriptureRef: 'Acts 16:15, Colossians 2:11-12'
            },
            {
                point: 'Sacramental Grace',
                ancientTeaching: 'Scripture says "Baptism now saves you." It is not just a sign but a washing of regeneration. Rejection makes the ritual a "dead work" of man rather than a work of God.',
                scriptureRef: '1 Peter 3:21, Titus 3:5'
            },
            {
                point: 'Symbolic Eucharist',
                ancientTeaching: 'Christ said "unless you eat the flesh of the Son of Man... you have no life in you." The Church never viewed this as a mere memorial for 1,500 years.',
                scriptureRef: 'John 6:53'
            }
        ]
    },
    {
        id: 'evangelical',
        name: 'Evangelical / Pentecostal',
        creator: 'Various (Post-Great Awakening)',
        originYear: '18th - 20th Century',
        dogma: [
            'Decision Theology: Salvation happens in an instant through a "Sinner\'s Prayer."',
            'Invisible Church: The "true" church has no hierarchy, liturgy, or physical boundary—it is just "believers" everywhere.',
            'Baptism of the Spirit: Modern "tongues" and spontaneous revelations are prioritized over Apostolic order.',
            'Rapture: A modern 19th-century theory that believers will be secretly "snatched away" before the tribulation.'
        ],
        contradictions: [
            {
                point: 'Invisible Church',
                ancientTeaching: 'The Church is the "Body of Christ," a visible, historical community with Bishops, Presbyters, and Deacons as established by the Apostles.',
                scriptureRef: '1 Timothy 3:1-13'
            },
            {
                point: 'Once Saved Always Saved (OSAS)',
                ancientTeaching: 'Salvation is a process (Theosis). St. Paul warned believers to "work out your salvation with fear and trembling" and that he himself could be disqualified.',
                scriptureRef: 'Philippians 2:12, 1 Corinthians 9:27'
            }
        ]
    },
    {
        id: 'catholicism',
        name: 'Roman Catholicism',
        creator: 'Bishop of Rome (Papal divergence)',
        originYear: '1054 AD (Great Schism)',
        dogma: [
            'Papal Supremacy: The Pope has absolute, immediate, and universal power over every Christian.',
            'Papal Infallibility: The Pope cannot err when speaking "Ex Cathedra" on faith or morals.',
            'Purgatory: A place of "cleansing fire" where one must suffer to pay off the temporal debt of sins already forgiven.',
            'Indulgences: The Church can distribute the "excess merits" of saints to reduce time in Purgatory.',
            'Filioque: Claiming the Holy Spirit proceeds from the Father AND the Son, changing the Creed without an Ecumenical Council.',
            'Immaculate Conception: Teaches Mary was born without Original Sin, separating her from our fallen human nature.'
        ],
        contradictions: [
            {
                point: 'Papal Supremacy',
                ancientTeaching: 'The Early Church used the Pentarchy (Rome, Constantinople, Alexandria, Antioch, Jerusalem). All Bishops are equal. The highest authority is an Ecumenical Council, not one man.',
            },
            {
                point: 'The Filioque',
                ancientTeaching: 'Christ said the Spirit "proceeds from the Father." Adding "and the Son" confuses the personal properties of the Trinity and was rejected by all ancient Patriarchates.',
                scriptureRef: 'John 15:26'
            },
            {
                point: 'Purgatory (Fire)',
                ancientTeaching: 'The Ancient Church prays for the dead but rejects the idea of a "fire" of torture for the forgiven. Grace is free; there is no "debt" to pay after repentance.',
            }
        ]
    },
    {
        id: 'restorationist',
        name: 'Adventist / Mormonism',
        creator: 'William Miller / Joseph Smith',
        originYear: '19th Century',
        dogma: [
            'Great Apostasy: Claim that the Church founded by Christ disappeared shortly after the Apostles and was only "restored" in the 1800s.',
            'New Revelation: Claiming new books (Book of Mormon) or specific dates (1844 Investigative Judgment) as essential for the "true" faith.',
            'Rejection of Trinity: Some groups (Mormons/JWs) reject the eternal divinity of Christ or the nature of the Trinity.'
        ],
        contradictions: [
            {
                point: 'The Gates of Hell',
                ancientTeaching: 'Christ promised: "I will build my church, and the gates of hell shall not prevail against it." To claim a 1,800-year apostasy is to say Christ failed and was a liar.',
                scriptureRef: 'Matthew 16:18'
            },
            {
                point: 'Perfected Faith',
                ancientTeaching: 'St. Jude says to "contend for the faith once delivered to the saints." The faith was complete. Modern additions/restorations are "another gospel."',
                scriptureRef: 'Jude 1:3, Galatians 1:8'
            }
        ]
    }
];
