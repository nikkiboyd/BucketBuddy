export class BucketList {
  constructor(
    public category: string,
    public completeness: boolean,
    public dateAdded: string,
    public dateCompleted: string,
    public title: string
  ) {}
}
