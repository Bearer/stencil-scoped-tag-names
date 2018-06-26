import * as ts from 'typescript'

const SCOPE = process.env.TAG_NAMES_SCOPE

export default (): ts.TransformerFactory<ts.SourceFile> => {
  function getNewTagName(tagName: string) {
    if (SCOPE) {
      return `${SCOPE}-${tagName}`
    }
    return tagName
  }

  function visitJsxElement(node: ts.JsxElement) {
    const { openingElement, closingElement, children } = node
    const oTagName = openingElement.tagName
    openingElement.tagName = ts.createLiteral(getNewTagName(oTagName.getText()))
    closingElement.tagName = ts.createLiteral(getNewTagName(oTagName.getText()))
    return ts.updateJsxElement(node, openingElement, children, closingElement)
  }

  function visitJsxSelfClosingElement(node: ts.JsxSelfClosingElement) {
    node.tagName = ts.createLiteral(getNewTagName(node.tagName.getText()))
    return node
  }

  return (context: ts.TransformationContext) => {
    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
      switch (node.kind) {
        case ts.SyntaxKind.JsxElement: {
          // add custom logic here to replace only component within the scr/components folder
          return ts.visitEachChild(visitJsxElement(<ts.JsxElement>node), visitor, context)
        }

        case ts.SyntaxKind.JsxSelfClosingElement:
          return ts.visitEachChild(visitJsxSelfClosingElement(<ts.JsxSelfClosingElement>node), visitor, context)

        default:
      }
      return ts.visitEachChild(node, visitor, context)
    }

    return (node: ts.SourceFile) => {
      if (node.isDeclarationFile) {
        return node
      }
      return ts.visitEachChild(node, visitor, context)
    }
  }
}
