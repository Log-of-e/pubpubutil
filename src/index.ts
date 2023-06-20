import * as fs from 'node:fs';
import { PubPub } from 'pubpub-client'
// import { PubPub as Pub02} from './api2.js'
// import { fileURLToPath } from 'node:url'
import { fileURLToPath } from 'url'
import config  from "config"; //use default export from node-config
import * as textract from 'textract'


const  communityUrl = config.get("communityUrl") as string
const  communityId  = config.get("communityId") as string
const  email  = config.get("email") as string
const  password  = config.get("password") as string


const pubpub = new PubPub(communityId, communityUrl)

/** 
async function troubleshootlogin(){
  try {
    let password = "8p!*u%E9UaTF3Ktt";
    console.log("email :::", email);
    console.log("TTTTTTTT SSSS :::", password);
    // return;
    const pxx = new Pub02(communityId, communityUrl);
    await pxx.login(email, password);
    console.log('logged in')

    let cookie00 = pxx.cookie
    console.log(' = cookie::', cookie00);
    await pxx.logout()
    console.log("LOGOUT")



  } catch (error) {
    console.error("Encountered error")
    console.error(error)
    
  }
}
*
*/


async function mainGetPubs() {
  try {
    let password = "8p!*u%E9UaTF3Ktt";
    console.log("email :::", email);
    console.log("aAAAAaaa p p p p :::", password);
    // return;

    await pubpub.login(email, password);

    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys", Object.keys(pubs))
    console.log("--- ---")
    console.log("--- ---")
    console.log("--- ---")
    console.log({ pubs })
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
    await pubpub.login(email, password)

    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys", Object.keys(pubs))
    // console.log({pubs})
    // console.log("{pubs}", JSON.stringify(pubs))


    const fileName = "May29Test01.pdf";
    const mimeType = "application/pdf"
    const pdf = await fs.readFileSync('/Users/nesim/Downloads/Report03.pdf')
    const fileOrPath = pdf

    // @ts-ignore
    const uploadedFile = await pubpub.uploadFile!({
      file: fileOrPath,
      fileName,
      mimeType,
    })

    console.log("uploadedFile ::", uploadedFile)

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
    await pubpub.login(email, password)
    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys", Object.keys(pubs))

    const docxMimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    const pdfMimeType = "application/pdf"
    const pdfURL = await fs.readFileSync('/Users/nesim/Downloads/Report03.pdf')

    const filename02 = await fs.readFileSync('/Users/nesim/Downloads/Report03.docx')


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


async function mainImportAPub(communityId:string, communityUrl:string, email:string,password:string) {


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
    await pubpub.login(email, password)
    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys", Object.keys(pubs))

    const docxMimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    const pdfMimeType = "application/pdf"
    const pdfURL = await fs.readFileSync('/Users/nesim/Downloads/Report03.pdf')

    const filename02 = await fs.readFileSync('/Users/nesim/Downloads/Report03.docx')


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



async function createAPub_DEPRECATE() {
  try {
    await pubpub.login(email, password)
    const p = pubpub

    const pubs = await pubpub.pub.getMany()
    console.log("pubs keys", Object.keys(pubs))

    const pub01 = await pubpub.pub.create()
    console.log("typeof pub01", typeof pub01)
    if (typeof pub01 == "object") console.log("Object.keys(pub01) ::", Object.keys(pub01))

    const { id, slug } = pub01 as { id: string, slug: string };
    console.log("======  =====", { id, slug })
    const title = "Review About X by AA";
    const pubMod = await p.pub.modify(id, {
      title: "Review About X by AA",
      description: "Eval of X by AA",
      slug,
      // customPublishedAt,
      htmlTitle: title,
      // license,
      // doi,
      // nodeLabels,
      // pubEdgeDisplay,
      // pubHeaderTheme,
      // citationStyle
    })


    const pubUrl = `pub/${slug}/draft`

    const docFile = await fs.readFileSync('/Users/nesim/Downloads/Report03.docx')

    const imported = await pubpub.pub.hacks.import(
      pubUrl,
      [
        {
          file: docFile,
          fileName: 'basic03.docx',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      ],
      // (doc, schema) => {
      //   console.dir(doc, { depth: 5 })
      //   const newDoc = doc.addToEnd(
      //     schema.nodes.paragraph.create(
      //       { id: 'test-id' },
      //       schema.text('manually insterted text')
      //     )
      //   )
      //   console.dir(newDoc, { depth: 5 })
      //   return newDoc
      // }
    )
    if (typeof imported == "object") console.log("Object.keys(imported) ::", Object.keys(imported))

    await pubpub.logout()
    console.log("LOGOUT")



  } catch (error) {
    console.error(error)
  }

}

class pubFileHandler {
  communityId: string
  communityUrl: string
  email?:string
  password?:string

  pubpub:PubPub

  constructor(communityId: string, communityUrl: string,
     email:string,password:string) {
    this.communityId = communityId
    this.communityUrl = communityUrl
    this.email=email
    this.password=password
  
    this.pubpub = new PubPub(communityId, communityUrl)

  }

  async init(){
    // const {email, password, pubpub} = this
    if (this.pubpub.cookie) return;
    if(!this.pubpub.cookie && this.email && this.password) { 
      await this.pubpub.login(this.email,this.password)
    }
  }

  async logout(){
    await pubpub.logout()
  }


  async fromPubPub(p:PubPub, cookie?:string, email?:string,password?:string){
    this.pubpub=p
    this.email=email;
    this.password=password;
    if(!p.cookie && email && password) { 
      await p.login(email,password)
    }
    return p
  }


  async  createPubImportUpdateAttribs(filePath:string, p:Promise<object>) {
  //  parseDocForTitle()
  //  createAPub()
  //  getAttribs() 
  //  modifyPub()
    await p;
   console.log()
  }

  parseDocForTitle(filePath:string, titleRegex=new RegExp(/\bEvaluation of .* by .* for the Unjournal/i)){
    let title=""
    return new Promise((resolve, reject)=>{
      textract
      .fromFileWithPath(filePath, function( error:any, text:string ) {
        if(error) {
          console.error("Error was::", error)
          reject(error)
        }
        const title = text.match(new RegExp(/\bEvaluation of .* by .* for the Unjournal/i))
        console.log("title foudn::", title)
        console.log("text substring", text.substring(0,65))

      })
      resolve({author:"Jim", title})
    })
  }

  parseDocAuthor(
    filePath:string, 
    title:string, 
    titleRegex=new RegExp(/\bEvaluation of .* by .* for the Unjournal/i), 
    authorRegex=new RegExp(/sdf/i)
    ){

  }


}

function testPubHandler(){
  const pub00 = new pubFileHandler(communityId, communityUrl, email, password)
}

// async function createAPub(communityId:string, communityUrl:string, email:string,password:string) {
async function createAPub(pubpub:PubPub) {
    try {

    const pub01 = await pubpub.pub.create()

    const { id, slug } = pub01 as { id: string, slug: string };
    console.log("===== created pub:", { id, slug })


    const pubUrl = `pub/${slug}/draft`

    const docFile = await fs.readFileSync('/Users/nesim/Downloads/Report03.docx')

    const imported = await pubpub.pub.hacks.import(
      pubUrl,
      [
        {
          file: docFile,
          fileName: 'basic03.docx',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      ],
      // (doc, schema) => {
      //   console.dir(doc, { depth: 5 })
      //   const newDoc = doc.addToEnd(
      //     schema.nodes.paragraph.create(
      //       { id: 'test-id' },
      //       schema.text('manually insterted text')
      //     )
      //   )
      //   console.dir(newDoc, { depth: 5 })
      //   return newDoc
      // }
    )
    if (typeof imported == "object") console.log("Object.keys(imported) ::", Object.keys(imported))

    await pubpub.logout()
    console.log("LOGOUT")

  } catch (error) {
    console.error(error)
  }

}


async function modifyPub(pubpub:PubPub,id:string,slug:string, options:any) {
      const title = options.title||"Review About X by AA";
      const description = options.description|| title;
    const pubMod = await pubpub.pub.modify(id, {
      title,
      description,
      // slug,
      // customPublishedAt,
      htmlTitle: title,
      // license,
      // doi,
      // nodeLabels,
      // pubEdgeDisplay,
      // pubHeaderTheme,
      // citationStyle
    })

}

// const textract = require('textract');

// function parseDocForTitle(){
//   const titleSearchExpression="Evaluation of ___  by _____ for The Unjournal";
//   let title:string;
//   console.log("+++++ ====== textextract demo");
//   textract.fromFileWithPath('/Users/nesim/Downloads/Copy\ of\ Template_Evaluation\ of\ XXX\ by\ XXX.docx', function( error:any, text:string ) {
//     const g = new RegExp(/\bEvaluation of .* by .* for the Unjournal/i)
//     if(error) console.error("Error was::", error)
//     title = text.match(g)
//     console.log("title foudn::", title)
//     console.log("text substring", text.substring(0,65))
//   })
//   while(!title){
//   }
//   return title;
// }

function parseDocForTitle(filePath:string, titleRegex=new RegExp(/\bEvaluation of .* by .* for the Unjournal/i)){
  let title="" as (string|null)
  return new Promise((resolve, reject)=>{
    textract
    .fromFileWithPath(filePath, ( error:any, text:string )=> {
      if(error) {
        console.error("Error was::", error)
        reject(error)
      }
      const title00 = text.match(titleRegex )
      if (title00) title=title00[0]
      // console.log("title foudn::", title)
      // console.log("text substring", text.substring(0,65))
    })
    resolve({author:"Jim", title})
  })
}



function uploadDir(){
  /**
   * 
   * for f in dir:
   *  createPubImportUpdateAttribs(pathName,AttribsSelector)
   *  */ 
  fs.readdirSync('', {withFileTypes:true})
}


// troubleshootlogin();
mainGetPubs();
// main()
// mainImportPubs();
// await createAPub()
(async function(){
  const filePath = '/Users/nesim/Downloads/Copy\ of\ Template_Evaluation\ of\ XXX\ by\ XXX.docx'
  let promise0 = parseDocForTitle(filePath )
  let tiAuth = await promise0
  console.log('title Author ::', tiAuth )

})()

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