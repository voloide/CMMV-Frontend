import { Model } from '@vuex-orm/core'

export default class InfoDocsOrImages extends Model {
  static entity = 'infodocsOrImages'

  static fields () {
    return {
      id: this.attr(null),
      title: this.attr(''),
      createdDate: this.attr(''),
      publishedDate: this.attr(''),
      blop: this.attr(''),
      forMobilizer: this.attr('')

      // Relationships
      // users: this.hasMany(Utente, 'utente_id'),
      // mobilizers: this.hasMany(CommunityMobilizer, 'community_mobilizer_id')
    }
  }
}
