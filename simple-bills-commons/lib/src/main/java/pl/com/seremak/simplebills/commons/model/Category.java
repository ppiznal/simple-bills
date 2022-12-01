package pl.com.seremak.simplebills.commons.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@Document
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category extends VersionedEntity {

    public enum Type {
        ASSET, STANDARD, CUSTOM, UNDEFINED
    }

    public enum TransactionType {
        INCOME, EXPENSE
    }

    private String username;

    private String name;

    private Type type;

    private TransactionType transactionType;

    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal limit;

    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal usageOfLimit;
}
