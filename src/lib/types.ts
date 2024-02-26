export type TJob = {
  id: string;
  createdTime: string;
  fields: {
    'Job ID'?: number,
    Posted?: string,
    'Job Title'?: string,
    Company?: string,
    Details?: 'string',
    Location?: string,
    Tags?: string[],
    Img?: {url: string}[],
    'Apply Link'?: string,
    'Company Website'?: string,
    'Posted Actual Time'?: string,
    Status?: 'Active' | 'Closed',
    'Job Title + Company'?: string,
    Social?: string;
    'Salary Short'?: string;
  }
}