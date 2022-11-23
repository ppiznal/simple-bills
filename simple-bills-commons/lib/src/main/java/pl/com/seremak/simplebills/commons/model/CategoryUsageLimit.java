package pl.com.seremak.simplebills.commons.model;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@Data
@Builder
@Document
@NoArgsConstructor
@AllArgsConstructor
public class CategoryUsageLimit extends VersionedEntity {

    private String username;

    private String categoryName;

    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal limit;

    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal usage;

    private String yearMonth;
}
