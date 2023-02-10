
/**
   * Returns the text in the given ParagraphElement.
   *
   * @param element a ParagraphElement from a Google Doc
   */

export function readParagraphElement(element) {
    const run = element.textRun
    if (run === undefined || typeof run.content === undefined) {
        // The TextRun can be null if there is an inline object.
        return ""
    }
    return run.content;
}

/**
  * Recurses through a array of Structural Elements to read a document's text where text may be in
  * nested elements.
  *
  * @param elements an array of Structural Elements
  */

export function readStructuralElements(elements) {
    //console.log(elements)
    var GdocText = ''
    elements.forEach(element => {
        //console.log(element)
        if (element.paragraph) {
            element.paragraph.elements.forEach(paragraphElement => {
                GdocText = GdocText.concat(readParagraphElement(paragraphElement))
            })
        } else if (element.table) {
            // The text in table cells are in nested Structural Elements and tables may be
            // nested.
            element.table.tableRows.forEach(row => {
                row.tableCells.forEach(cell => {
                    GdocText = GdocText.concat(readStructuralElements(cell.content))
                })
            })
        } else if (element.tableOfContents) {
            // The text in the TOC is also in a Structural Element.
            GdocText = GdocText.concat(readStructuralElements(element.tableOfContents.content))
        }
    })
    return GdocText
}

export function extractFields(Gdoc) {
    var headerContent = ''
    var footerContent = ''
    var bodyContent = readStructuralElements(Gdoc.body.content)
    for (var footer in Gdoc.footers) {
        footerContent += readStructuralElements(Gdoc.footers[footer].content)
    }
    for (var header in Gdoc.headers) {
        //console.log(readStructuralElements(doc.headers[header].content))
        headerContent += readStructuralElements(Gdoc.headers[header].content)
    }

    //Match all {{}} fields in a template
    var re = /\{{([^}]+)\}}/g
    var text = headerContent + footerContent + bodyContent
    var matches = [...text.matchAll(re)]
    var matchesData = {
        matches: [],
        uniqueMatches: [],
    }
    var field = ''
    matches.forEach(match => {
        //remove {{}} from field name
        field = match[0].replace('{{', '').replace('}}', '')
        matchesData.matches.push(field)
    })
    //This gets all unique values in an array by changing a random array into a Set object, (which
    //only has unique values), then changes the Set back to an array (and it only contains unique values)
    matchesData.uniqueMatches = [...new Set(matchesData.matches)]
    return matchesData
}