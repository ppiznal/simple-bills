package pl.com.seremak.simplebills.commons.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Deposit extends VersionedEntity {

    public enum DepositType {
        PERPETUAL, TERM
    }

    private String username;

    private String name;

    private BigDecimal value;

    private DepositType depositType;

    private String bankName;

    private Integer durationInMonths;

    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal annualInterestRate;

    private Integer transactionNumber;
}
