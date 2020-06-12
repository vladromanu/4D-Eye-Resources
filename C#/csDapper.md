Table of contents
[TOC]

### Filter strings
```
if (!string.IsNullOrWhiteSpace(request.Name))
{
    builder.Where("LOWER(name) LIKE @Name", new { Name = "%" + request.Name.ToLower().Trim() + "%"  });
}
```

### Filter integers
```
if (request.DestinationId > 0)
{
    builder.Where("destination_id = @DestinationId", new { DestinationId = request.DestinationId });
}
```

### Dapper Fetch list with template 
```
public async Task<IEnumerable<PropertyRoomtype>> FindAsync2(PropertyRoomTypeRequest request)
{
    try
    {
        using (var conn = _connectionFactory.Create(_connectionString))
        {
            await conn.OpenAsync().ConfigureAwait(false);

            var builder = new SqlBuilder();
            var selector = builder.AddTemplate($"{PropertyRoomtypeQueries.SelectAll} /**where**/");

            if (request.PropertyId > 0)
            {
                builder.Where("property_id = @Property_id", new { Property_id = request.PropertyId });
            }

            if (request.OccupancyId > 0)
            {
                builder.Where("occupancy_id = @OccupancyId", new { OccupancyId = request.OccupancyId });
            }

            if (request.RoomTypeId > 0)
            {
                builder.Where("roomtype_id = @RoomTypeId", new { RoomTypeId = request.RoomTypeId });
            }

            return await conn.QueryAsync<PropertyRoomtype>(selector.RawSql, selector.Parameters).ConfigureAwait(false);
        }
    }
    catch (ArgumentNullException ex)
    {
        _logger.LogWarning(ex.Message);
    }
    catch (MySqlException ex)
    {
        _logger.LogWarning(ex.Message);
    }

    return null;
}
```

Template
```
public static class PropertyRoomtypeQueries
{
    public const string SelectAll = @"
        SELECT
            id as Id,
            property_id as PropertyId,
            roomtype_id as RoomtypeId,
            occupancy_id as OccupancyId,
            created_at as CreatedAt,
            updated_at as UpdatedAd,
            modified_by as ModifiedBy
        FROM
            property_roomtype
    ";
}
```

### Dapper simple fetchOne with template 
```
public async Task<IEnumerable<PropertyRoomtype>> FindOneAsync(int id)
{
    try
    {
        using (var conn = _connectionFactory.Create(_connectionString))
        {
            await conn.OpenAsync().ConfigureAwait(false);

            var builder = new SqlBuilder();

            var selector = builder.AddTemplate($"{PropertyRoomtypeQueries.SelectAll} /**where**/");
            builder.Where("property_id = @Property_id");

            return await conn.QueryAsync<PropertyRoomtype>(selector.RawSql, new { Property_id = id }).ConfigureAwait(false);
        }
    }
    catch (ArgumentNullException ex)
    {
        _logger.LogWarning(ex.Message);
    }
    catch (MySqlException ex)
    {
        _logger.LogWarning(ex.Message);
    }

    return null;
}
```