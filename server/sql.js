module.exports = {
  personList: {
    query: `
      SELECT t1.person_name_ko, t1.person_name_en, t1.person_information, t1.person_created, t2.image_url, t3.category_name, t4.keyword_name_1, t4.keyword_name_2, t4.keyword_name_3, t4.keyword_name_4
      FROM t_person t1, t_image t2, t_category t3, t_keyword t4
      WHERE t1.person_id = t2.person_id
      AND t1.category_id = t3.category_id
      AND t2.image_type = 1
      AND t4.person_id = t1.person_id`
  },
  personDetail: {
    query: `
      SELECT t1.*, t2.image_url, t3.category_name, t4.keyword_name_1, t4.keyword_name_2, t4.keyword_name_3, t4.keyword_name_4 
      FROM t_person t1, t_image t2, t_category t3, t_keyword t4
      WHERE t2.person_id = t1.person_id 
      AND t3.category_id = t1.category_id
      AND t4.person_id = t1.person_id`
  },
  keyword: {
    query: `
      SELECT t1.*, t3.keyword_name
      FROM t_person t1, t_keyword t3
      WHERE t1.fir_keyword_id = t3.keyword_id 
      OR t1.sec_keyword_id = t3.keyword_id
      OR t1.thr_keyword_id = t3.keyword_id
      OR t1.for_keyword_id = t3.keyword_id
      OR t1.fif_keyword_id = t3.keyword_id`
  }
}