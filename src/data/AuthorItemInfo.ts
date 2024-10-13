export interface AuthorItemInfo {
    name: string
    sites?: AuthorItemSite[]
}

export interface AuthorItemSite {
    name: string
    src: string
}
