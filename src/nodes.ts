import { TypeElementTypes, InterfaceDeclaration } from 'ts-simple-ast';
import { getMemberTags } from './tags';

export const getNodeInfo = (m:InterfaceDeclaration | TypeElementTypes) => ({
  text: m.getJsDocs().map(d => (d.compilerNode as any).comment).join('. '),
  tags: getMemberTags(m as any),//TODO: move out
  typeName: (m.getType().compilerType as any).intrinsicName || '',
  typeFlags: {
    isNumeric: m.getType().isNumber(),
    isBoolean: m.getType().isBoolean(),
    isString: m.getType().isString(),
    isEnum:m.getType().isEnum(),
    isArray: m.getType().isArray(),
    isObject: m.getType().isObject(),
    isAnonymous: m.getType().isAnonymous()
  }
});