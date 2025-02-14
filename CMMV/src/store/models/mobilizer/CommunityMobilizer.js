import { Model } from '@vuex-orm/core'
import Utente from '../utente/Utente'
import InfoDocsOrImages from '../dorcOrImages/InfoDocsOrImages'
import District from '../district/District'
// import { MobilizerLogin } from '../userLogin/UserLoginHierarchy'

export default class CommunityMobilizer extends Model {
  static entity = 'communityMobilizers'

  get contacts () {
    return `${this.cellNumber} ${this.cellNumber2}`
  }

  get fullName () {
    return `${this.firstNames} ${this.lastNames}`
  }

  static fields () {
    return {
      id: this.attr(null),
      firstNames: this.attr(''),
      lastNames: this.attr(''),
      cellNumber: this.attr(''),
      cellNumber2: this.attr(''),
      uuid: this.attr(''),
    //  clinic_id: this.attr(''),
      district_id: this.attr(''),
      // user_id: this.attr(''),

      // Relationships
      utentes: this.hasMany(Utente, 'communityMobilizer_id'),
      docsOrImages: this.hasMany(InfoDocsOrImages, 'docsOrImages_id'),
    //  clinic: this.belongsTo(Clinic, 'clinic_id'),
      district: this.belongsTo(District, 'district_id')
      // user: this.hasOne(MobilizerLogin, 'user_id')
    }
  }
}
