
/**
 * Comment for WithDocs 
 * @internal This is not intended for others
 */
export interface WithDocs{
  /**
   * Comment for member. Also with `markdown` and &ltstrong&gt;
   */
  member: MemberType;
}

/**
 * Comment for MemberType
 */
export interface MemberType{
  child: ChildType;
}

export interface ChildType extends MemberType{
  /**
   * Comment for lostChild
   */
  lostChild: any;
}
export interface IconListProps {  
  valueItems: any;
  title?: string;
  defaultIcon?: number; 
}