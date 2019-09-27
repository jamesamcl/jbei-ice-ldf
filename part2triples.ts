
import { Entry } from 'jbei-ice-js'
import { Predicates, Types } from 'bioterms';

let prefix = 'http://ice.jbei.org#'

export default async function part2triples(iceURL:string, s:string, entry:Entry) {

    let triples:any[] = []

    let sbol = await entry.getSBOL2()

    for(let cd of sbol.componentDefinitions) {
        for(let triple of sbol.match(cd.uri, null, null)) {

            if(triple.predicate.nominalValue === Predicates.SBOL2.sequence) {
                triples.push({ s, p: Predicates.SBOL2.sequence, o: s + '#sequence' })
                continue
            }

            if(triple.interfaceName === 'NamedNode') {
                triples.push({ s, p: triple.predicate.nominalValue, o: triple.object.nominalValue })
            } else {
                triples.push({ s, p: triple.predicate.nominalValue, o: triple.object.nominalValue, datatype: 'string' })
            }
        }
    }



    /*

      object:
   { interfaceName: 'Literal',
     nominalValue: 'Nathan Hillson',
     language: null,
     datatype:
      { interfaceName: 'NamedNode',
        nominalValue: 'http://www.w3.org/2001/XMLSchema#string' },
     native: undefined } }*/

    /*

    triples.push({ s, p: Predicates.a, o: Types.SBOL2.ComponentDefinition })

    triples.push({ s, p: prefix + 'bioSafetyLevel', o: entry.bioSafetyLevel, datatype: 'string' })

    triples.push({ s, p: prefix + 'id', o: entry.id.toString(), datatype: 'string' })
    triples.push({ s, p: prefix + 'type', o: entry.type, datatype: 'string' })

    for(let parentID of entry.parentIDs) {
        triples.push({ s, p: prefix + 'parent', o: iceURL + '/parts/' + parentID })
    }

    for(let parentID of entry.linkedPartIDs) {
        triples.push({ s, p: prefix + 'linkedPart', o: iceURL + '/parts/' + parentID })
    }

    triples.push({ s, p: prefix + 'index', o: entry.index, datatype: 'string' })
    triples.push({ s, p: prefix + 'ownerId', o: entry.ownerId, datatype: 'string' })
    triples.push({ s, p: prefix + 'creatorId', o: entry.creatorId, datatype: 'string' })
    triples.push({ s, p: prefix + 'status', o: entry.status, datatype: 'string' })
    triples.push({ s, p: prefix + 'shortDescription', o: entry.shortDescription, datatype: 'string' })
    triples.push({ s, p: prefix + 'creationTime', o: entry.creationTime, datatype: 'string' })
    triples.push({ s, p: prefix + 'modificationTime', o: entry.modificationTime, datatype: 'string' })
    triples.push({ s, p: prefix + 'bioSafetyLevel', o: entry.bioSafetyLevel, datatype: 'string' })
    triples.push({ s, p: prefix + 'principalInvestigatorId', o: entry.principalInvestigatorId, datatype: 'string' })
    triples.push({ s, p: prefix + 'basePairCount', o: entry.basePairCount, datatype: 'string' })
    triples.push({ s, p: prefix + 'featureCount', o: entry.featureCount, datatype: 'string' })
    triples.push({ s, p: prefix + 'viewCount', o: entry.viewCount, datatype: 'string' })
    triples.push({ s, p: prefix + 'hasAttachment', o: entry.hasAttachment, datatype: 'string' })
    triples.push({ s, p: prefix + 'hasSample', o: entry.hasSample, datatype: 'string' })
    triples.push({ s, p: prefix + 'hasSequence', o: entry.hasSequence, datatype: 'string' })
    triples.push({ s, p: prefix + 'hasOriginalSequence', o: entry.hasOriginalSequence, datatype: 'string' })
    triples.push({ s, p: prefix + 'canEdit', o: entry.canEdit, datatype: 'string' })
    triples.push({ s, p: prefix + 'accessPermissions', o: entry.accessPermissions, datatype: 'string' })
    triples.push({ s, p: prefix + 'publicRead', o: entry.publicRead, datatype: 'string' })

    triples.push({ s, p: prefix + 'partId', o: entry.partId, datatype: 'string' })
    triples.push({ s, p: prefix + 'recordId', o: entry.recordId, datatype: 'string' })
    triples.push({ s, p: prefix + 'name', o: entry.name, datatype: 'string' })

    if(entry.alias !== undefined)
        triples.push({ s, p: prefix + 'alias', o: entry.alias, datatype: 'string' })
*/
    return triples
}


