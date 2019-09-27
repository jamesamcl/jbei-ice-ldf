
import { Folder } from 'jbei-ice-js'
import { Predicates, Types } from 'bioterms';

let prefix = 'http://ice.jbei.org#'

export default async function folder2triples(iceURL:string, s:string, folder:Folder) {

    let triples:any[] = []

    triples.push({ s, p: Predicates.a, o: Types.SBOL2.Collection })

    if(folder.folderName !== undefined)
        triples.push({ s, p: Predicates.Dcterms.title, o: folder.folderName, datatype: 'string' })

    triples.push({ s, p: prefix + 'id', o: folder.id + '', datatype: 'http://www.w3.org/2001/XMLSchema#integer' })
    triples.push({ s, p: prefix + 'entryCount', o: folder.entryCount + '', datatype: 'http://www.w3.org/2001/XMLSchema#integer' })

	let entries = await folder.getEntries()

	for(let entry of entries) {
		triples = triples.concat([
			{ s, p: Predicates.SBOL2.member, o: iceURL + '/parts/' + entry.id }
		])
    }

    return triples
}


