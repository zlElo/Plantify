const tips = [
  "Regelmäßiges Gießen ist wichtig, aber vergiss nicht, dass zu viel Wasser schädlich sein kann!",
  "Pflanzen lieben es, wenn du sie regelmäßig düngst. Verwende jedoch nur organische Dünger!",
  "Ein guter Kompost kann deinen Garten zum Blühen bringen. Versuche, deine eigenen Komposthaufen zu erstellen!",
  "Pflanzen brauchen Licht, aber einige Pflanzen bevorzugen Schatten. Achte darauf, dass du die richtigen Pflanzen für deine Lichtverhältnisse wählst!",
  "Ein guter Garten beginnt mit gesunden Samen. Achte darauf, dass du hochwertige Samen verwendest!",
  "Regelmäßige Pflege ist wichtig, um deine Pflanzen gesund zu halten. Überprüfe deine Pflanzen regelmäßig auf Schädlinge und Krankheiten!",
  "Ein guter Garten ist ein ökologischer Garten. Versuche, so viele natürliche Elemente wie möglich in deinen Garten zu integrieren!",
  "Mulchen hilft, Feuchtigkeit im Boden zu halten und Unkraut zu unterdrücken. Verwende organisches Material wie Stroh oder Rindenmulch!",
  "Fruchtwechsel ist wichtig, um Bodenmüdigkeit zu vermeiden. Plane jedes Jahr eine andere Anordnung deiner Pflanzen!",
  "Nützlinge wie Bienen und Schmetterlinge sind wichtig für deinen Garten. Pflanze bienenfreundliche Blumen, um sie anzulocken!",
  "Hochbeete sind ideal für kleine Gärten und erleichtern die Pflege. Sie bieten auch bessere Drainage und wärmen sich schneller auf!",
  "Mischkulturen können Schädlinge abwehren und den Ertrag steigern. Informiere dich über gute Pflanzenkombinationen!",
  "Regenwasser ist ideal zum Gießen. Stelle Regentonnen auf, um Wasser zu sammeln und zu sparen!",
  "Gründüngung verbessert die Bodenqualität. Säe nach der Ernte Pflanzen wie Klee oder Lupinen aus!",
  "Kräuter sind pflegeleicht und nützlich in der Küche. Lege ein kleines Kräuterbeet an!",
  "Vertikales Gärtnern spart Platz. Nutze Wände und Zäune für kletternde Pflanzen wie Bohnen oder Erbsen!",
  "Achte auf die richtige Pflanzzeit. Jede Pflanze hat ihre optimale Aussaat- und Pflanzzeit!",
  "Bodenanalysen helfen dir, den pH-Wert und Nährstoffgehalt deines Bodens zu verstehen. Passe deine Düngung entsprechend an!",
  "Schneide verblühte Blumen regelmäßig ab, um eine längere Blütezeit zu fördern!",
  "Wildblumenwiesen fördern die Biodiversität. Reserviere einen Teil deines Gartens für heimische Wildblumen!",
  "Verwende natürliche Schädlingsbekämpfungsmittel wie Brennnesseljauche oder Seifenlauge statt chemischer Pestizide!",
  "Achte auf die richtige Pflanzdichte. Zu eng gepflanzte Pflanzen konkurrieren um Nährstoffe und Licht!",
  "Winterharte Pflanzen können dir auch in der kalten Jahreszeit frisches Gemüse liefern. Plane deinen Garten ganzjährig!",
  "Sammle und lagere Samen von deinen besten Pflanzen für das nächste Jahr. So sparst du Geld und züchtest robuste, an deine Bedingungen angepasste Pflanzen!",
  "Erstelle einen Gartenplan, um den Überblick zu behalten und eine gute Rotation zu gewährleisten!",
  "Achte auf die richtige Werkzeugpflege. Saubere und scharfe Werkzeuge erleichtern die Gartenarbeit!",
  "Nutze Pflanzenreste als natürlichen Dünger. Gräser, Blätter und Gemüseabfälle können direkt in den Boden eingearbeitet werden!",
  "Baue Nistkästen und Insektenhotels, um nützliche Tiere in deinen Garten zu locken!",
  "Experimentiere mit ungewöhnlichen Gemüsesorten. Vielfalt macht den Garten interessanter und erhöht die Ernährungssicherheit!",
  "Lerne die Kunst des Veredelns. So kannst du mehrere Obstsorten an einem Baum züchten!",
  ]
  
export const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];