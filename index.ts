
import ICE, { Folder } from 'jbei-ice-js'
import urljoin = require('url-join')

let LDFServer = require('ldf-facade')
let { UNIMPLEMENTED } = require('ldf-facade')

let iceURL = 'https://acs-registry.jbei.org'

let ice = new ICE('https://acs-registry.jbei.org', 'james@mclgh.net', '68412bddc0f9')
let server = new LDFServer()

import folder2triples from './folder2triples'
import part2triples from './part2triples'
import partseq2triples from './partseq2triples'

import { Types, Predicates } from 'bioterms'


function parseSubject(uri:string):any {

	if(uri.indexOf(iceURL) !== 0)
		return {}

	let path = uri.slice(iceURL.length)

	let match = /^\/collections\/([A-Z]+)$/.exec(path)

	if(match) {
		return { collection: match[1] }
	}

	match = /^\/folders\/([0-9]+)$/.exec(path)

	if(match) {
		return { folder: parseInt(match[1]) }
	}

	match = /^\/parts\/([0-9]+)$/.exec(path)

	if(match) {
		return { part: parseInt(match[1]) }
	}

	match = /^\/parts\/([0-9]+)#sequence/.exec(path)

	if(match) {
		return { sequence: parseInt(match[1]) }
	}

	return {}
}

function makeCollectionURI(collection:string) {
	return iceURL + '/collections/' + collection
}

function makeFolderURI(folder:number) {
	return iceURL + '/folders/' + folder
}

//server.enumSubjects(async (state) => {

    /*
     *
	//let collections = Object.keys(CollectionType).map(
		//(collection) => collectionPrefix + collection)

	let collections = [ iceURL + '/collections/FEATURED' ]

	//let folders = (await ice.getCollectionFolders('FEATURED'))
		//.map((folder) => folderPrefix + folder.id)

	//let values = collections.concat(folders)
	let values = collections

	return {
		values,
		total: values.length,
		nextState: null
	}*/

   //return UNIMPLEMENTED

//})

server.pattern('s??', async (state, pattern) => {

	let subject = parseSubject(pattern.s)

	if(subject.folder) {
		let folder = await ice.getFolder(subject.folder)
		let triples = await folder2triples(iceURL, pattern.s, folder)
		return { triples, total: triples.length, nextState: null }
	}

	if(subject.collection) {
		let collection = await ice.getCollection(subject.collection)
		let folders = await collection.getFolders()
		let triples = ([
			{ s: pattern.s, p: Predicates.a, o: Types.SBOL2.Collection }
		]).concat(folders.map((f) => {
			return { s: pattern.s, p: Predicates.SBOL2.member, o: makeFolderURI(f.id) }
		}))
		return { triples, total: triples.length, nextState: null }
	}

	if(subject.part) {
		let part = await ice.getPart(subject.part)
		let triples = await part2triples(iceURL, pattern.s, part)
		return { triples, total: triples.length, nextState: null }
	}

    if(subject.sequence) {
		let part = await ice.getPart(subject.sequence)
		let triples = await partseq2triples(iceURL, pattern.s, part)
		return { triples, total: triples.length, nextState: null }
    }

	return UNIMPLEMENTED

})

server.listen(9898)





