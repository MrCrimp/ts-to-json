import test from 'ava';
import {getNodeInfo} from './nodes';
import * as mocks from './__mocks__';

test('undefined node', t => {
  t.throws( ()=>getNodeInfo(undefined) )
});

test('no errors without jsdocs', t => {

  const file = mocks.mockProject.getSourceFile('empty.ts');
  const ifs = file.getInterfaces()[0];
  
  const info = getNodeInfo(ifs);

  t.deepEqual(info.tags, []); 
  t.is(info.description, '')
  t.is(info.typeName,'')
  t.is(info.typeFlags.isAnonymous, false)
})

test('JsDocs on the interface', t => {

  const file = mocks.mockProject.getSourceFile('interfaces.ts');
  const ifs = file.getInterface("WithDocs");
  
  const info = getNodeInfo(ifs);

  t.deepEqual(info, {
    name: 'WithDocs',
    tags: [{
      name: 'internal'
    }],
    description: 'Comment for WithDocs',
    typeName: '',
    typeFlags: {
       isAnonymous: false,
       isArray: false,
       isBoolean: false,
       isEnum: false,
       isNumeric: false,
       isObject: true,
       isString: false,
       isClass: false,
       isInterface: true
    } 
  })
})