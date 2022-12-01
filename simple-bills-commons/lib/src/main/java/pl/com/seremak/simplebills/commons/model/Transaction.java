package pl.com.seremak.simplebills.commons.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;
import java.time.Instant;


@Document
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Transaction extends VersionedEntity {

    public enum Type {
        INCOME, EXPENSE
    }

    private String user;

    private Integer transactionNumber;

    private Type type;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    @Field(targetType = FieldType.DATE_TIME)
    private Instant date;

    private String description;

    private String category;

    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal amount;
}
