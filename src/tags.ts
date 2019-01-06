import { TypeElementTypes, InterfaceDeclaration } from 'ts-simple-ast';

export const getMemberTags = (m:TypeElementTypes | InterfaceDeclaration) => {
  const firstDoc = m.getJsDocs() && m.getJsDocs()[0];
  const tags = firstDoc ? firstDoc.getTags() : []
  //JsDoc tags are not expanded, just text lines, might need work
  return firstDoc ? tags.map((tag) => ({name: tag.getTagName()})) : [];
}