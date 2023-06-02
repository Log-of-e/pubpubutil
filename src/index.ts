import * as fs from 'node:fs';
import { PubPub } from 'pubpub-client'
// import { fileURLToPath } from 'node:url'
import { fileURLToPath } from 'url'


const communityUrl = 'https://testabcd123456789.pubpub.org'
const communityId = 'fce230e8-c211-40e1-8a34-60a65c1aad08'

process.env.COMMUNITY_ID = communityId
process.env.COMMUNITY_URL= communityUrl
process.env.EMAIL = 'nesim.engineer@gmail.com'
process.env.PASSWORD = 'iY7FNzLh8mc*%5Dv'

const pubpub = new PubPub(communityId, communityUrl)

async function mainGetPubs() {
  try {
    await pubpub.login('nesim.engineer@gmail.com', 'iY7FNzLh8mc*%5Dv')

    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys",Object.keys(pubs))
    console.log("--- ---")
    console.log("--- ---")
    console.log("--- ---")
    console.log({pubs})
    // console.log("--- ---")
    // console.log("--- ---")
    // console.log("--- ---")
    // console.log("{pubs}", JSON.stringify(pubs))
  

    await pubpub.logout()
    console.log("LOGOUT")
  
  } catch (error) {
    console.error("Encountered error")
    console.error(error)    
  }

} 

async function main() {
  try {
    await pubpub.login('nesim.engineer@gmail.com', 'iY7FNzLh8mc*%5Dv')

    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys",Object.keys(pubs))
    // console.log({pubs})
    // console.log("{pubs}", JSON.stringify(pubs))
  

    const fileName="May29Test01.pdf";
    const mimeType="application/pdf"
    const pdf = await fs.readFileSync('/Users/nesim/Downloads/Report03.pdf')
    const fileOrPath = pdf
    
    // @ts-ignore
    const uploadedFile = await pubpub.uploadFile!({
      file: fileOrPath,
      fileName,
      mimeType,
    })

    console.log( "uploadedFile ::", uploadedFile )

    // const uploadData =  {
    //   url: uploadedFile.url,
    //   type: 'formatted',
    //   createdAt: new Date().toISOString(),
    // }


    await pubpub.logout()
    console.log("LOGOUT")
  
  } catch (error) {
    console.error("Encountered error")
    console.error(error)    
  }

} 


async function mainImportPubs() {

  const basicImport = {
    doc: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { id: 'abstract', level: 1, fixedId: 'abstract' },
          content: [{ text: 'Abstract', type: 'text' }],
        },
        {
          type: 'paragraph',
          content: [{ text: 'This is a test abstract.', type: 'text' }],
        },
      ],
    },
    warnings: [],
    proposedMetadata: {},
    pandocErrorOutput: '',
  }

  if (!process.env.COMMUNITY_ID) throw new Error('Missing community id')
  if (!process.env.COMMUNITY_URL) throw new Error('Missing community url')
  if (!process.env.EMAIL) throw new Error('Missing email')
  if (!process.env.PASSWORD) throw new Error('Missing password')

  // const testUrl = 'pub/25f1ymdq/draft'
  // const testId = '10a6ef16-4d19-4e9f-93bf-0ae1a5e247bc'
  const testUrl = 'pub/k7i89nid/draft'
  // const testId = 'fced44a5-ce71-46e3-ae82-df2a37706a8b'
  
  try {
  
  } catch (error) {
    console.error("Encountered error")
    console.error(error)    
  }


  try {
    await pubpub.login('nesim.engineer@gmail.com', 'iY7FNzLh8mc*%5Dv')
    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys",Object.keys(pubs))

    const docxMimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    const pdfMimeType="application/pdf"
    const pdfURL = await fs.readFileSync('/Users/nesim/Downloads/Report03.pdf')

    const filename02= await fs.readFileSync('/Users/nesim/Downloads/Report03.docx')


    const imported = await pubpub.pub.hacks.import(
      testUrl,
      [
        {
          file: fileURLToPath(new URL('./basic.docx', import.meta.url)), //filename02,//
          fileName: 'basic03.docx',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      ],
      (doc, schema) => {
        console.dir(doc, { depth: 5 })
        const newDoc = doc.addToEnd(
          schema.nodes.paragraph.create(
            { id: 'test-id' },
            schema.text('manually insterted text')
          )
        )
        console.dir(newDoc, { depth: 5 })
        return newDoc
      }
    )

    await pubpub.logout()
    console.log("LOGOUT")


  } catch (e) {
    console.log(e)
    throw e
  }



} 


mainGetPubs()
// main()
// mainImportPubs();

console.log("DONE");
/**
 * 
 * foldr of 3 docx
 *  -upload , import as 3 separate pubs
 *  - 
 * 
 * important upload
 *  author
 * title
 * settings
 *  - link - friendly name
 *  - descripyion
 *  add to colections - completed
 *  Pub connections 
 *  - ether doi or web url to te main journal article
 *  - connect to each other
 *   - then swich direction
 * 
 * 
 * Evaluation Metrics tablethat includes prediction metrics
 * validate?
 * visualization?
 * 
 * 
 * kotahi - open source? customizable?
 *  - problems with it, cannot get DOI
 * 
 * 
 * Pussible user evaluator input interfaces
 *  - google docs
 *   amsmsart sheet
 *   air table
 *    notion
 *    others???
 * 
 */