import { TypeElementTypes, InterfaceDeclaration } from 'ts-simple-ast';
import { getMemberTags } from './tags';

const triviaCommentsAsString = (node) => node.getJsDocs().map(d => d.compilerNode.comment).join('. ');

const getHiddenIntrinsicTypeName = $type => $type.getType().compilerType.intrinsicName || ''

export const getNodeInfo = (node:InterfaceDeclaration | TypeElementTypes): NodeInfo => {
  const name = (node as any).getName();
  const $type = node.getType();

  return {
    name,
    description: triviaCommentsAsString(node),
    tags: getMemberTags(node), 
    typeName: getHiddenIntrinsicTypeName(node),
    typeFlags: {
      isNumeric: $type.isNumber(),
      isBoolean: $type.isBoolean(),
      isString: $type.isString(),
      isEnum:$type.isEnum(),
      isArray: $type.isArray(),
      isObject: $type.isObject(),
      isAnonymous: $type.isAnonymous(),
      isInterface: $type.isInterface(),
      isClass: $type.isClass()
    }
  }
}
export interface TagInfo{
  name:string;
}
export interface NodeInfo{
  name:string;
  description:string;
  tags: TagInfo[];
  typeName: string,
  typeFlags: {
    isNumeric: boolean;
    isBoolean: boolean;
    isString: boolean;
    isEnum: boolean;
    isArray: boolean;
    isObject: boolean;
    isAnonymous: boolean;
    isInterface: boolean;
    isClass: boolean;
  }
}