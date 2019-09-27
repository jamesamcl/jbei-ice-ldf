
import { Entry } from 'jbei-ice-js'
import { Predicates, Types } from 'bioterms';

let prefix = 'http://ice.jbei.org#'

export default async function partseq2triples(iceURL:string, s:string, entry:Entry) {

    let triples:any[] = []

    let sbol = await entry.getSBOL2()

    for(let cd of sbol.sequences) {
        for(let triple of sbol.match(cd.uri, null, null)) {
            if(triple.interfaceName === 'NamedNode') {
                triples.push({ s, p: triple.predicate.nominalValue, o: triple.object.nominalValue })
            } else {
                triples.push({ s, p: triple.predicate.nominalValue, o: triple.object.nominalValue, datatype: 'string' })
            }
        }
    }

    return triples
}


