import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  PlayCircle,
  Presentation,
  Search,
  Table2,
} from 'lucide-react'
import { evidenceItems } from './data/evidence'
import './App.css'

const phaseCopy = [
  {
    id: 'overview',
    label: 'Overzicht',
    kicker: 'Procesverslag',
    title: 'Van losse Notion-notities naar een duidelijk bullet journal',
    summary:
      'Ik heb mijn proces vooral digitaal bijgehouden, omdat ik tijdens dit project continu op mijn laptop werkte. Deze website ordent dat ruwe logboek in een visuele route: plannen, onderzoek, keuzes, prototypes, testfeedback en reflectie.',
    bullets: [
      'Centrale HKW-vraag: hoe kunnen we de studie-inhoud van TB Tilburg duidelijker en aantrekkelijker overbrengen?',
      'Alle miniplannen, resultaten, feedbackbestanden en presentaties zijn gekoppeld als bewijs.',
      'De fasen volgen de design-thinkinglijn: empathize, define, ideate, prototype en test.',
    ],
  },
  {
    id: 'empathize',
    label: 'Empathize',
    kicker: 'Onderzoeken',
    title: 'Begrijpen waarom toekomstige studenten TB wel of niet zien zitten',
    summary:
      'In deze fase lag de focus op interviews, enquetegegevens, stakeholders, persona en empathy map. De belangrijkste observatie: de naam Technische Bedrijfskunde klinkt voor veel studenten abstracter en technischer dan de opleiding in werkelijkheid voelt.',
    bullets: [
      'Interviewvragen opgesteld voor huidige TB-studenten, andere Fontys-studenten, scholieren en docenten.',
      'Enquete en interviewresultaten gebruikt om pijnpunten rond informatie, imago en verwachtingen te vinden.',
      'Stakeholdermatrix, persona en empathy map maakten zichtbaar wie invloed heeft op de studiekeuze.',
    ],
  },
  {
    id: 'define',
    label: 'Define',
    kicker: 'Scherpstellen',
    title: 'De kern werd: inhoud duidelijk maken in plaats van alleen promoten',
    summary:
      'Na onderzoek is de richting aangescherpt naar betere uitleg van de studie-inhoud. De customer journey en designprincipes lieten zien waar een potentiele student behoefte heeft aan herkenbare voorbeelden, eenvoudige taal en overzicht.',
    bullets: [
      'HKW-vraag uitgewerkt rondom duidelijkheid, aantrekkelijkheid en bewuste studiekeuze.',
      'Customer journey gebruikt om frictiepunten op de route naar aanmelden zichtbaar te maken.',
      'Designprincipes opgesteld voor een betere informatie-ervaring op de Fontys TB-pagina.',
    ],
  },
  {
    id: 'ideate',
    label: 'Ideate',
    kicker: 'Ideeën kiezen',
    title: 'Veel ideeen gemaakt, daarna bewust gefilterd richting een websiteprototype',
    summary:
      'Met brainstormmethodes zoals ABC, lotus, COCD-box, negatieve selectie en de 100-eurotest zijn veel richtingen verkend. Social media bleef een alternatief, maar de website won omdat die direct aansluit op het moment waarop studenten informatie zoeken.',
    bullets: [
      'Ideeen zoals chatbot, studievergelijker, rooster, visuals, vlogs en eenvoudigere taal onderzocht.',
      'COCD-box, negatieve selectie en 100-eurotest hielpen om van veel ideeen naar een haalbare richting te gaan.',
      'De keuze voor een website paste bij de HKW-vraag en bij mijn eigen technische bijdrage in het project.',
    ],
  },
  {
    id: 'prototype',
    label: 'Prototype & Test',
    kicker: 'Maken en verbeteren',
    title: 'Een hifi websiteprototype getest, aangepast en opnieuw onderbouwd',
    summary:
      'We kozen bewust voor een hifi prototype, zodat testers de verbeterde website echt konden ervaren. Feedback uit Forms, docenten en medestudenten is gebruikt voor prototype 2 en voor de force-fieldanalyse.',
    bullets: [
      'Prototype 1 en 2 zijn gekoppeld via YouTube-links en onderbouwd met feedbackbestanden.',
      'Feedback leidde tot iteraties in structuur, taal, visuele uitleg en duidelijkheid van functies.',
      'Investeringsselectie en force-fieldanalyse verbinden het prototype met haalbaarheid en verandering.',
    ],
  },
  {
    id: 'result',
    label: 'Resultaten',
    kicker: 'Opleveren',
    title: 'Eindpresentatie, video en verzameld bewijs vormen het resultaat',
    summary:
      'Het eindresultaat bestaat uit de projectpresentatie, het websiteprototype, testresultaten, analyses en een korte AI-promotievideo. Samen laten ze zien hoe het project van probleem naar oplossing is gegaan.',
    bullets: [
      'De volledige projectpresentatie geeft de rode draad van het project weer.',
      'De promotievideo is een extra visual uit de lessen en laat een mogelijke communicatiestijl zien.',
      'Reflectie: prototype bouwen, testen en ideeen filteren ging goed; eerder feedback vragen kon beter.',
    ],
  },
]

const requirements = [
  ['Miniplannen', 'Per fase staan de miniplannen in de bewijsbibliotheek.'],
  ['Observaties en inzichten', 'Interviews, enquete, stakeholdermatrix, persona en empathy map zijn gekoppeld.'],
  ['Ideeen en schetsen', 'Mindmap, lotusbrainstorm, COCD-box, selectie en onepager-schets staan erbij.'],
  ['Resultaten', 'Prototype-links, eindpresentatie, feedback en video zijn apart vindbaar.'],
  ['Verantwoording', 'Keuzes, iteraties en reflectie zijn per fase uitgelegd.'],
  ['Visualisatie', 'Afbeeldingen, video, PDF-preview en downloads maken het journal controleerbaar.'],
]

const methodNotes = [
  {
    phase: 'Empathize',
    title: 'Interviewvragen',
    why:
      'Ik heb interviewvragen opgesteld om de empathize fase gericht te starten. Zonder goede vragen krijg je losse meningen; met vaste vragen konden we duidelijker achterhalen wat studenten wel of niet begrijpen aan TB Tilburg.',
    result:
      'De antwoorden maakten zichtbaar dat de naam Technische Bedrijfskunde technisch en moeilijk kan overkomen, terwijl veel studenten niet precies weten wat de opleiding inhoudt.',
  },
  {
    phase: 'Empathize',
    title: 'Mindmap en braindump',
    why:
      'De mindmap was bedoeld als snelle braindump. Hiermee konden we alle eerste ideeen, vermoedens en richtingen verzamelen voordat we te vroeg een oplossing zouden kiezen.',
    result:
      'Dit gaf houvast voor de rest van het onderzoek en liet zien dat informatievoorziening, beeldvorming en studiekeuze allemaal met elkaar verbonden zijn.',
  },
  {
    phase: 'Empathize',
    title: 'Stakeholdermatrix, persona en empathy map',
    why:
      'Deze methodes hielpen om niet alleen vanuit onszelf te denken. We brachten in kaart wie invloed heeft op studiekeuze en wat een potentiele student ziet, hoort, denkt, voelt, zegt en doet.',
    result:
      'De belangrijkste inzichten waren dat studenten overzicht missen, de naam technisch vinden klinken en behoefte hebben aan concrete voorbeelden van beroepen, projecten en ervaringen.',
  },
  {
    phase: 'Define',
    title: 'Probleemkluwen, roadmap en HKW-vraag',
    why:
      'Met de probleemkluwen en roadmap konden we het brede probleem kleiner maken. Daardoor konden we kiezen voor een ontwerpvraag die haalbaar was en direct aansloot op de onderzoeksinzichten.',
    result:
      'De HKW-vraag werd: hoe kunnen we de studie-inhoud van TB Tilburg duidelijker en aantrekkelijker overbrengen, zodat toekomstige studenten een bewustere studiekeuze kunnen maken?',
  },
  {
    phase: 'Define',
    title: 'Customer journey en designprincipes',
    why:
      'De customer journey liet zien hoe een potentiele student de weg naar TB ervaart. De designprincipes maakten concreet waar een betere informatiepagina aan moest voldoen.',
    result:
      'Hieruit kwam dat de website kort, duidelijk, visueel en herkenbaar moet zijn, met makkelijke taal en informatie die meteen antwoord geeft op twijfels.',
  },
  {
    phase: 'Alle fasen',
    title: 'Miniplannen',
    why:
      'Voor elke fase maakten we een miniplan om vooraf duidelijk te hebben wat het doel was, wie we nodig hadden, welke methode we gingen gebruiken en wanneer het af moest zijn.',
    result:
      'De plannen gaven structuur. Ze veranderden niet veel, omdat we vooral tijdens lessen, fysiek overleg en via WhatsApp bijstuurden.',
  },
  {
    phase: 'Ideate',
    title: 'ABC-techniek, persoonlijke analogie en vrije incubatie',
    why:
      'Deze technieken gebruikte ik om veel verschillende ideeen te krijgen. De ABC-techniek gaf snel variatie, persoonlijke analogie hielp om mezelf in de positie van de doelgroep te plaatsen en vrije incubatie gaf ruimte om ideeen later door te laten groeien.',
    result:
      'Dit leverde tientallen ideeen op, zoals studentverhalen, video, chatbot, rooster, studievergelijker, duidelijke taal en meer visuals.',
  },
  {
    phase: 'Ideate',
    title: 'Lotusbloem',
    why:
      'De lotusbloem werd gebruikt om rondom het centrale onderwerp nieuwe deelonderwerpen en verbanden te vinden. Het was vooral een manier om ideeen te structureren en uit te breiden.',
    result:
      'De methode hielp bij het breder kijken, maar is daarna minder zwaar gebruikt dan de selectie-methodes.',
  },
  {
    phase: 'Ideate',
    title: 'COCD-box, negatieve selectie en 100-eurotest',
    why:
      'Na het brainstormen hadden we veel ideeen. De COCD-box hielp om wow-ideeen zichtbaar te maken, negatieve selectie haalde ongeschikte ideeen eruit en de 100-eurotest dwong ons om te kiezen waar we echt in zouden investeren.',
    result:
      'We kwamen uit op een kleinere set sterke ideeen. Social media bleef een alternatief, maar we kozen voor het verbeteren van de website omdat dit direct past bij de HKW-vraag.',
  },
  {
    phase: 'Prototype',
    title: 'Hifi websiteprototype',
    why:
      'We kozen voor een hifi prototype omdat een website pas goed te testen is als iemand hem echt kan ervaren. Alleen losse plaatjes zouden minder duidelijk zijn en sneller rommelig overkomen.',
    result:
      'Prototype 1 gaf meteen bruikbare reacties. Daarna is prototype 2 aangepast op basis van feedback uit Forms, medestudenten en docenten.',
  },
  {
    phase: 'Test',
    title: 'Forms, feedback en force-fieldanalyse',
    why:
      'Met Forms konden we testfeedback verzamelen van studenten. De force-fieldanalyse hielp om stimulerende en tegenwerkende krachten rond de oplossing zichtbaar te maken.',
    result:
      'De feedback onderbouwde verbeteringen aan prototype 2 en maakte duidelijk welke onderdelen aantrekkelijk, duidelijk of juist nog lastig waren.',
  },
  {
    phase: 'Resultaat',
    title: 'Excel-grafieken, presentaties en video',
    why:
      'Interview- en enqueteresultaten zijn in Excel gezet zodat ze makkelijker gedeeld en visueler gemaakt konden worden. De presentaties vatten de voortgang samen en de AI-video was een extra visuele promotie-oefening.',
    result:
      'Samen vormen deze bestanden het bewijs voor onderzoek, keuzes, resultaten en communicatie van het project.',
  },
]

const requirementAudit = [
  {
    title: 'Logboek/procesverslag',
    status: 'Voldoet',
    proof:
      'De tijdlijn beschrijft per fase wat is gedaan. De Notion-PDF staat als bron en de site ordent alle processtappen.',
  },
  {
    title: 'Miniplannen',
    status: 'Voldoet',
    proof:
      'Empathize, define, ideate, prototype en testfase hebben miniplannen als downloadbaar bewijs.',
  },
  {
    title: 'Observaties en inzichten',
    status: 'Voldoet',
    proof:
      'Interviews, enquete, persona, empathy map, stakeholdermatrix, customer journey en feedback zijn gekoppeld en inhoudelijk toegelicht.',
  },
  {
    title: 'Ideeen en schetsen',
    status: 'Voldoet',
    proof:
      'Mindmap, lotusbloem, ABC/analogie/incubatie, COCD-box, negatieve selectie, 100-eurotest en onepager-schets staan in de site.',
  },
  {
    title: 'Resultaten',
    status: 'Voldoet',
    proof:
      'Prototypevideo’s, feedbackbestanden, eindpresentatie, force-fieldanalyse, investeringsselectie en promotievideo zijn zichtbaar of downloadbaar.',
  },
  {
    title: 'Verantwoording: beslissingen en onderbouwingen',
    status: 'Voldoet',
    proof:
      'De keuze voor TB-instroom, de HKW-vraag, website in plaats van social media, hifi prototype en testaanpak zijn uitgelegd.',
  },
  {
    title: 'Iteraties',
    status: 'Voldoet',
    proof:
      'De overgang van onepager/roadmap-idee naar compacte website en van prototype 1 naar prototype 2 staat beschreven.',
  },
  {
    title: 'Reflecties',
    status: 'Voldoet',
    proof:
      'De site benoemt wat goed ging, wat beter kon en wat is geleerd over samenwerken, feedback vragen en het proces van doel naar oplossing.',
  },
  {
    title: 'Visualisatie',
    status: 'Voldoet',
    proof:
      'De site gebruikt fasekaarten, criteria, previews, afbeeldingen, video, PDF-viewer, filters en downloads in plaats van alleen tekst.',
  },
]

const kindIcons = {
  image: ImageIcon,
  video: PlayCircle,
  sheet: Table2,
  slides: Presentation,
  pdf: FileText,
  doc: FileText,
  text: LinkIcon,
  file: FileText,
}

const kindLabels = {
  image: 'Afbeelding',
  video: 'Video',
  sheet: 'Excel',
  slides: 'PowerPoint',
  pdf: 'PDF',
  doc: 'Word',
  text: 'Links',
  file: 'Bestand',
}

function tidy(text) {
  return String(text || '')
    .replaceAll('â€œ', '"')
    .replaceAll('â€', '"')
    .replaceAll('â€˜', "'")
    .replaceAll('â€™', "'")
    .replaceAll('â†’', '->')
    .replaceAll('Ã©', 'e')
    .replaceAll('Ã«', 'e')
    .replaceAll('ðŸŽ“', '')
    .replaceAll('ðŸ”€', '')
    .replaceAll('ðŸ«', '')
    .replaceAll('ðŸ‘©â€ðŸ«', '')
    .split(String.fromCharCode(0))
    .join('')
}

function fileUrl(path) {
  return encodeURI(path)
}

function EvidenceCard({ item, onOpen }) {
  const Icon = kindIcons[item.kind] || FileText
  const phase = phaseCopy.find((entry) => entry.id === item.phase)

  return (
    <article className="evidence-card">
      <div className="evidence-topline">
        <span className={`kind kind-${item.kind}`}>
          <Icon size={15} aria-hidden="true" />
          {kindLabels[item.kind] || 'Bestand'}
        </span>
        <span>{item.sizeKb} KB</span>
      </div>
      <h3>{tidy(item.title)}</h3>
      <p className="source">{item.sourcePath}</p>
      {item.kind === 'image' && (
        <button className="thumb-button" type="button" onClick={() => onOpen(item)}>
          <img src={fileUrl(item.path)} alt={tidy(item.title)} loading="lazy" />
        </button>
      )}
      {item.kind === 'video' && (
        <video className="inline-video" src={fileUrl(item.path)} controls preload="metadata" />
      )}
      {item.excerpt && <p className="excerpt">{tidy(item.excerpt)}</p>}
      <p className="used-for">Gebruikt bij: {phase?.label || item.phase}</p>
      <div className="button-row">
        <button type="button" onClick={() => onOpen(item)}>
          <ExternalLink size={16} aria-hidden="true" />
          Bekijk
        </button>
        <a href={fileUrl(item.download)} download>
          <Download size={16} aria-hidden="true" />
          Download
        </a>
      </div>
    </article>
  )
}

function PreviewModal({ item, onClose }) {
  if (!item) return null

  const preview = (() => {
    if (item.kind === 'image') {
      return <img className="modal-image" src={fileUrl(item.path)} alt={tidy(item.title)} />
    }
    if (item.kind === 'video') {
      return <video className="modal-video" src={fileUrl(item.path)} controls autoPlay />
    }
    if (item.kind === 'pdf') {
      return <iframe className="modal-frame" src={fileUrl(item.path)} title={tidy(item.title)} />
    }
    if (item.kind === 'text') {
      return <pre>{tidy(item.text)}</pre>
    }
    return (
      <div className="text-preview">
        <p>
          Dit bestand is als download beschikbaar. Hieronder staat de automatisch uitgelezen
          tekstsamenvatting.
        </p>
        <pre>{tidy(item.text || item.excerpt || 'Geen automatische tekstpreview beschikbaar.')}</pre>
      </div>
    )
  })()

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Bestand bekijken">
      <div className="modal">
        <div className="modal-header">
          <div>
            <p className="eyebrow">{kindLabels[item.kind] || 'Bestand'}</p>
            <h2>{tidy(item.title)}</h2>
          </div>
          <button type="button" className="close-button" onClick={onClose}>
            Sluiten
          </button>
        </div>
        {preview}
        <div className="modal-footer">
          <a href={fileUrl(item.download)} download>
            <Download size={16} aria-hidden="true" />
            Download origineel
          </a>
          <a href={fileUrl(item.path)} target="_blank" rel="noreferrer">
            <ExternalLink size={16} aria-hidden="true" />
            Open in nieuw tabblad
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activePhase, setActivePhase] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return evidenceItems.filter((item) => {
      const phaseMatch = activePhase === 'all' || item.phase === activePhase
      const searchMatch =
        !normalized ||
        `${item.title} ${item.sourcePath} ${item.excerpt}`.toLowerCase().includes(normalized)
      return phaseMatch && searchMatch
    })
  }, [activePhase, query])

  const prototypeLinks = evidenceItems.find((item) =>
    item.sourcePath.includes('links naar videos'),
  )

  return (
    <>
      <header className="site-header">
        <nav aria-label="Hoofdnavigatie">
          <a href="#proces">Proces</a>
          <a href="#methodes">Methodes</a>
          <a href="#verantwoording">Verantwoording</a>
          <a href="#minimumvereisten">Check</a>
          <a href="#bewijs">Bewijs</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Technische Bedrijfskunde Tilburg - jaar 1, periode 4</p>
            <h1>Bullet journal project TB-instroom</h1>
            <p>
              Een digitaal procesverslag over het project waarin we onderzochten hoe Fontys
              Technische Bedrijfskunde Tilburg duidelijker en aantrekkelijker kan worden
              overgebracht aan toekomstige studenten.
            </p>
            <div className="hero-actions">
              <a href="#bewijs">
                Bekijk bewijs
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a href={fileUrl('/evidence/bullet journal in notion/bullet journal.pdf')} download>
                Download Notion-PDF
                <Download size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Project in het kort">
            <BookOpen size={26} aria-hidden="true" />
            <h2>HKW-vraag</h2>
            <p>
              Hoe kunnen we de studie-inhoud van TB Tilburg duidelijker en aantrekkelijker
              overbrengen, zodat toekomstige studenten een bewustere studiekeuze kunnen maken?
            </p>
          </div>
        </section>

        <section className="requirements" aria-label="Minimumvereisten">
          {requirements.map(([title, body]) => (
            <article key={title}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </section>

        <section id="proces" className="process-section">
          <div className="section-heading">
            <p className="eyebrow">Proces</p>
            <h2>De rode draad door het project</h2>
            <p>
              Elke fase koppelt een korte uitleg aan concrete bestanden. Daardoor is zichtbaar
              wat er is gedaan, waarom keuzes zijn gemaakt en welk bewijs daarbij hoort.
            </p>
          </div>
          <div className="timeline">
            {phaseCopy.map((phase, index) => {
              const count = evidenceItems.filter((item) => item.phase === phase.id).length
              return (
                <article key={phase.id} id={phase.id}>
                  <div className="timeline-index">{index + 1}</div>
                  <div className="timeline-content">
                    <p className="eyebrow">{phase.kicker}</p>
                    <h2>{phase.title}</h2>
                    <p>{phase.summary}</p>
                    <ul>
                      {phase.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <button type="button" onClick={() => setActivePhase(phase.id)}>
                      Toon {count} bewijsstukken
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="methodes" className="methods-section">
          <div className="section-heading">
            <p className="eyebrow">Methodes en waarom</p>
            <h2>Waarom deze aanpak is gebruikt</h2>
            <p>
              Hieronder staat de inhoudelijke uitleg uit het Notion-logboek verder uitgewerkt:
              niet alleen wat er is gemaakt, maar ook waarom de methode paste bij deze fase en
              wat het opleverde voor het project.
            </p>
          </div>
          <div className="methods-grid">
            {methodNotes.map((method) => (
              <article key={`${method.phase}-${method.title}`}>
                <span>{method.phase}</span>
                <h3>{method.title}</h3>
                <p>
                  <strong>Waarom gebruikt:</strong> {method.why}
                </p>
                <p>
                  <strong>Wat leverde het op:</strong> {method.result}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="verantwoording" className="decision-section">
          <div>
            <p className="eyebrow">Verantwoording</p>
            <h2>Belangrijkste keuzes en iteraties</h2>
          </div>
          <div className="decision-grid">
            <article>
              <h3>Waarom deze richting?</h3>
              <p>
                We kozen voor het onderwerp TB-instroom omdat het dicht bij onszelf ligt. Als
                eerstejaars kunnen we goed beoordelen waar de opleiding onduidelijk overkomt en
                makkelijk in gesprek met medestudenten en docenten.
              </p>
            </article>
            <article>
              <h3>Waarom een website?</h3>
              <p>
                Social media was een serieus alternatief, maar de website sluit direct aan op het
                moment waarop scholieren informatie zoeken. Een hifi websiteprototype gaf testers
                bovendien meteen gevoel bij de oplossing.
              </p>
            </article>
            <article>
              <h3>Wat veranderde na feedback?</h3>
              <p>
                Uit testfeedback kwam dat duidelijkheid, eenvoudige taal, visuals en bruikbare
                functies belangrijk waren. Daarom is prototype 2 aangescherpt op structuur,
                uitleg en informatie die echt helpt bij kiezen.
              </p>
            </article>
            <article>
              <h3>Reflectie</h3>
              <p>
                Het bouwen, testen en filteren van ideeen ging goed. Wat beter kon: eerder
                feedback vragen en sneller afscheid nemen van een groepsvorm die niet goed werkte.
              </p>
            </article>
          </div>
          {prototypeLinks && (
            <div className="prototype-links">
              <h3>Prototypevideo's</h3>
              {tidy(prototypeLinks.text)
                .split('\n')
                .filter(Boolean)
                .map((line) => {
                  const [, label, href] = line.match(/(prototype\s+\d):\s+(.*)/i) || []
                  return (
                    <a key={line} href={href || '#'} target="_blank" rel="noreferrer">
                      <PlayCircle size={17} aria-hidden="true" />
                      {label || line}
                    </a>
                  )
                })}
            </div>
          )}
        </section>

        <section id="minimumvereisten" className="audit-section">
          <div className="section-heading">
            <p className="eyebrow">Minimumvereisten</p>
            <h2>Controle op de opdracht</h2>
            <p>
              De opdracht vraagt om logboek/procesverslag, resultaten, verantwoording en een
              visuele vorm. Deze controle laat zien waar elk onderdeel op de site terugkomt.
            </p>
          </div>
          <div className="audit-list">
            {requirementAudit.map((item) => (
              <article key={item.title}>
                <div>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <h3>{item.title}</h3>
                </div>
                <span>{item.status}</span>
                <p>{item.proof}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="bewijs" className="evidence-section">
          <div className="section-heading">
            <p className="eyebrow">Bewijsbibliotheek</p>
            <h2>Alle bestanden bij elkaar</h2>
            <p>
              Gebruik de filters om per fase te controleren welke documenten, afbeeldingen,
              presentaties, spreadsheets en video's bij het bullet journal horen.
            </p>
          </div>

          <div className="tools">
            <div className="phase-tabs" role="tablist" aria-label="Filter op fase">
              <button
                type="button"
                className={activePhase === 'all' ? 'active' : ''}
                onClick={() => setActivePhase('all')}
              >
                Alles
              </button>
              {phaseCopy.map((phase) => (
                <button
                  key={phase.id}
                  type="button"
                  className={activePhase === phase.id ? 'active' : ''}
                  onClick={() => setActivePhase(phase.id)}
                >
                  {phase.label}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">Zoeken in bewijs</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Zoek op bestand, fase of inhoud"
              />
            </label>
          </div>

          <div className="count-line">{filteredItems.length} van {evidenceItems.length} bestanden zichtbaar</div>

          <div className="evidence-grid">
            {filteredItems.map((item) => (
              <EvidenceCard key={item.id} item={item} onOpen={setSelected} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>
          Gemaakt als digitaal bullet journal voor Technische Bedrijfskunde Tilburg. Alle
          bewijsstukken staan lokaal in de Vercel-site en blijven downloadbaar.
        </p>
      </footer>

      <PreviewModal item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
